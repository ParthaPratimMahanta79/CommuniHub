const Groq = require('groq-sdk');
const Complaint = require('../models/Complaint');
const Maintenance = require('../models/Maintenance');
const Expense = require('../models/Expense');
const User = require('../models/User');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// 1. Complaint Categoriser
const categoriseComplaint = async (req, res) => {
  try {
    const { description } = req.body;

    const response = await groq.chat.completions.create({
     model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: `You are a housing society complaint classifier. 
          Given a complaint description, respond ONLY with a JSON object like this:
          {"category": "Plumbing", "priority": "High", "summary": "Brief summary"}
          Categories: Plumbing, Electrical, Cleanliness, Security, Noise, Other
          Priority: Low, Medium, High`
        },
        {
          role: 'user',
          content: description
        }
      ],
    });

    const raw = response.choices[0].message.content;
    const clean = raw.replace(/```json|```/g, '').trim();
    const result = JSON.parse(clean);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Smart Due Reminder
const generateDueReminder = async (req, res) => {
  try {
    const { residentId } = req.body;

    const resident = await User.findById(residentId).select('-password');
    if (!resident) return res.status(404).json({ message: 'Resident not found' });

    const overdueBills = await Maintenance.find({
      resident: residentId,
      status: { $in: ['Pending', 'Overdue'] }
    });

    if (overdueBills.length === 0) {
      return res.json({ message: 'No overdue bills for this resident' });
    }

    const totalDue = overdueBills.reduce((sum, b) => sum + b.totalAmount, 0);
    const months = overdueBills.map(b => `${b.month} ${b.year}`).join(', ');

    const response = await groq.chat.completions.create({
     model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are a housing society admin assistant. Write polite but firm payment reminder messages.'
        },
        {
          role: 'user',
          content: `Write a short payment reminder for resident ${resident.name} in flat ${resident.flatNumber}. 
          They have pending maintenance dues of ₹${totalDue} for months: ${months}. 
          Keep it under 100 words, polite but firm.`
        }
      ],
    });

    res.json({
      resident: resident.name,
      flatNumber: resident.flatNumber,
      totalDue,
      months,
      reminderMessage: response.choices[0].message.content
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Expense Anomaly Detector
const detectExpenseAnomaly = async (req, res) => {
  try {
    const expenses = await Expense.find({ society: req.user.society });

    if (expenses.length < 3) {
      return res.json({ message: 'Not enough expense data to detect anomalies' });
    }

    const expenseList = expenses.map(e => 
      `${e.category}: ₹${e.amount} on ${new Date(e.date).toDateString()}`
    ).join('\n');

    const response = await groq.chat.completions.create({
     model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: `You are a financial analyst for a housing society. 
          Analyze expenses and identify anomalies or unusually high amounts.
          Respond with a JSON array like:
          [{"expense": "description", "reason": "why it's anomalous", "severity": "Low/Medium/High"}]
          If no anomalies found, return empty array [].`
        },
        {
          role: 'user',
          content: `Analyze these society expenses for anomalies:\n${expenseList}`
        }
      ],
    });

    const raw = response.choices[0].message.content;
    const clean = raw.replace(/```json|```/g, '').trim();
    const result = JSON.parse(clean);

    res.json({ anomalies: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { categoriseComplaint, generateDueReminder, detectExpenseAnomaly };