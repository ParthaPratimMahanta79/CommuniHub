# CommuniHub — Residential Society & Apartment Management Platform

> **Adivya 2.0 Developer Hackathon | Problem Statement #26ENCH8**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://communi-hub-ten.vercel.app/login)
[![Backend](https://img.shields.io/badge/Backend-Render-blue?style=for-the-badge&logo=render)](https://communihub-backend.onrender.com)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-green?style=for-the-badge&logo=mongodb)](https://mongodb.com)

---

## Problem Statement

Build a **complete digital management system** for residential societies and apartment complexes — connecting residents, society admins, and security guards with visitor management, complaint tracking, facility booking, and AI assistance.

### Three Roles
- **Resident** — Pay maintenance, raise complaints, book facilities, manage visitors, view notices
- **Society Admin** — Manage residents, collect dues, handle complaints, track expenses, post notices, approve bookings
- **Guard / Security** — Manage visitor entry and exit, verify OTP, view pre-approved visitor list

---

## Solution

CommuniHub is a full-stack web application that digitizes the entire residential society management workflow. It features real-time complaint tracking, AI-powered categorization, OTP-based visitor management, facility booking with conflict detection, and a comprehensive admin dashboard with income vs expense analytics.

---

## Live Demo

| Link | URL |
|------|-----|
| Frontend | https://communi-hub-ten.vercel.app |
| Backend API | https://communihub-backend.onrender.com |

### Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@test.com | 123456 |
| Resident | partha3@test.com | 123456 |
| Guard | guard@test.com | 123456 |

---

## Features

### Resident Features
- **Digital Maintenance Bill** — View monthly breakdown (maintenance, water, parking) and pay online
- **Complaint Portal** — Raise complaints with category, description, and track status (Raised → Assigned → In Progress → Resolved)
- **AI Complaint Categoriser** — Type complaint in plain English, AI auto-assigns category and priority
- **Facility Booking** — Book clubhouse, gym, swimming pool, or conference room for a time slot
- **Visitor Pre-Approval** — Enter visitor details, get a unique OTP to share with visitor
- **Notices Board** — View all society announcements

### Society Admin Features
- **Resident Management** — Add/remove residents, assign flats, view all residents
- **Maintenance Billing** — Generate monthly bills for all residents in one click
- **Payment Tracking** — Track paid, pending, and overdue bills
- **Complaint Management** — View all complaints, update status
- **Facility Booking Approval** — Approve or reject booking requests
- **Expense Tracker** — Log society expenses (lift maintenance, garden, security staff salary)
- **Income vs Expense Dashboard** — Monthly graphs with balance overview
- **AI Smart Due Reminder** — AI drafts polite but firm reminder messages for overdue residents
- **AI Expense Anomaly Detector** — AI flags unusually high expense entries

### Guard / Security Features
- **Visitor Entry Log** — Name, flat to visit, vehicle number, entry time
- **OTP Verification** — Verify pre-approved visitors via OTP
- **Exit Logging** — Mark exit time when visitor leaves
- **Daily Visitor Report** — Visible to admin and guard

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS v4 |
| Routing | React Router DOM v6 |
| HTTP Client | Axios |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Authentication | JWT + bcryptjs |
| AI Features | Groq API (llama-3.3-70b-versatile) |
| Frontend Deploy | Vercel |
| Backend Deploy | Render |
| Database Host | MongoDB Atlas |

---

## File Structure

```
CommuniHub/
├── backend/
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js        # Register & Login
│   │   ├── complaintController.js   # Complaint CRUD
│   │   ├── facilityController.js    # Facility booking
│   │   ├── maintenanceController.js # Billing & payments
│   │   ├── noticeController.js      # Notices board
│   │   ├── residentController.js    # Resident management
│   │   ├── visitorController.js     # Visitor & OTP
│   │   ├── expenseController.js     # Expense tracker
│   │   └── aiController.js          # Groq AI features
│   ├── middleware/
│   │   ├── authMiddleware.js        # JWT verification
│   │   └── roleMiddleware.js        # Role-based access
│   ├── models/
│   │   ├── User.js                  # User schema (3 roles)
│   │   ├── Complaint.js             # Complaint schema
│   │   ├── Facility.js              # Facility booking schema
│   │   ├── Maintenance.js           # Billing schema
│   │   ├── Notice.js                # Notice schema
│   │   ├── Visitor.js               # Visitor schema
│   │   └── Expense.js               # Expense schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── complaintRoutes.js
│   │   ├── facilityRoutes.js
│   │   ├── maintenanceRoutes.js
│   │   ├── noticeRoutes.js
│   │   ├── residentRoutes.js
│   │   ├── visitorRoutes.js
│   │   ├── expenseRoutes.js
│   │   └── aiRoutes.js
│   ├── utils/
│   │   └── generateOTP.js           # 6-digit OTP generator
│   ├── .env
│   ├── package.json
│   └── server.js                    # Express app entry point
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── axios.js             # Axios instance with JWT interceptor
    │   ├── components/
    │   │   └── Sidebar.jsx          # Role-based sidebar navigation
    │   ├── context/
    │   │   └── AuthContext.jsx      # Global auth state
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── resident/
    │   │   │   ├── Dashboard.jsx    # Stats, notices, pending bills
    │   │   │   ├── Complaints.jsx   # Raise + track complaints with AI
    │   │   │   ├── Maintenance.jsx  # View bills + pay
    │   │   │   ├── Facilities.jsx   # Book facilities
    │   │   │   └── Visitors.jsx     # Pre-approve visitors + OTP
    │   │   ├── admin/
    │   │   │   ├── Dashboard.jsx    # Stats + income/expense overview
    │   │   │   ├── Residents.jsx    # Residents table
    │   │   │   ├── Complaints.jsx   # Manage all complaints
    │   │   │   ├── Expenses.jsx     # Add/view expenses
    │   │   │   └── Facilities.jsx   # Approve/reject bookings
    │   │   └── guard/
    │   │       └── Dashboard.jsx    # OTP verify + visitor log
    │   ├── App.jsx                  # Routes + protected routes
    │   └── main.jsx                 # App entry point
    └── package.json
```

---

## AI Features

| Feature | Description |
|---------|-------------|
| Complaint Categoriser | Resident types complaint in plain English. AI assigns category (Plumbing/Electrical/etc.) and priority (Low/Medium/High) |
| Smart Due Reminder | Admin selects overdue resident. AI drafts a polite but firm payment reminder message |
| Expense Anomaly Detector | AI analyzes all society expenses and flags unusually high entries compared to historical data |

All AI features powered by **Groq API** using `llama-3.3-70b-versatile` model.

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and get JWT |

### Complaints
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/complaints` | Resident |
| GET | `/api/complaints/my` | Resident |
| GET | `/api/complaints/all` | Admin |
| PUT | `/api/complaints/:id` | Admin |

### Maintenance
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/maintenance/generate` | Admin |
| GET | `/api/maintenance/my` | Resident |
| GET | `/api/maintenance/all` | Admin |
| PUT | `/api/maintenance/pay/:id` | Resident |

### Visitors
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/visitors/preapprove` | Resident |
| GET | `/api/visitors/my` | Resident |
| POST | `/api/visitors/verify-entry` | Guard |
| PUT | `/api/visitors/exit/:id` | Guard |
| GET | `/api/visitors/today` | Guard/Admin |

### Facilities
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/facilities` | Resident |
| GET | `/api/facilities/my` | Resident |
| GET | `/api/facilities/all` | Admin |
| PUT | `/api/facilities/:id` | Admin |

### AI
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/ai/categorise` | All |
| POST | `/api/ai/reminder` | Admin |
| GET | `/api/ai/anomaly` | Admin |

---

## Local Setup

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Groq API Key (free at console.groq.com)

### Backend Setup

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/CommuniHub.git
cd CommuniHub/backend

# Install dependencies
npm install

# Create .env file and fill in your values
cp .env.example .env

# Start development server
npx nodemon server.js
```

### Frontend Setup

```bash
cd CommuniHub/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
NODE_ENV=development
```

---

## Development Timeline

| Day | Work Done |
|-----|-----------|
| Day 1 | Backend setup, MongoDB, JWT Auth with 3 roles |
| Day 2 | Complaints system, Maintenance Billing, Notices Board |
| Day 3 | Resident Management, Expense Tracker, Admin Dashboard |
| Day 4 | Visitor Management, OTP Generation, Guard Dashboard |
| Day 5 | Facility Booking with conflict detection |
| Day 6 | AI Features using Groq — complaint categoriser, due reminder, anomaly detector |
| Day 7 | React Frontend with Tailwind CSS, Deployment on Vercel and Render |

---

## Developer

**Partha Pratim Mahanta**

Built for **Adivya 2.0 Developer Hackathon** at IIT

---

## License

This project is built for hackathon purposes.
