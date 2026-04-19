const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/complaints', require('./routes/complaintRoutes'));
app.use('/api/maintenance', require('./routes/maintenanceRoutes'));
app.use('/api/notices', require('./routes/noticeRoutes'));
app.use('/api/residents', require('./routes/residentRoutes'));
app.use('/api/expenses', require('./routes/expenseRoutes'));
app.use('/api/visitors', require('./routes/visitorRoutes'));
app.use('/api/facilities', require('./routes/facilityRoutes'));

app.get('/', (req, res) => {
  res.send('CommuniHub API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});