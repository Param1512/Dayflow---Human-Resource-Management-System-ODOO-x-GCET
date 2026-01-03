# 🌅 Dayflow - Human Resource Management System

**"Every workday, perfectly aligned"**

A comprehensive HR Management System built with Angular, Express.js, and MongoDB. Dayflow streamlines HR operations including employee management, attendance tracking, leave management, and payroll visibility.

---

## 📋 Features

### 🔐 Authentication & Authorization
- **Secure Sign Up/Sign In** with JWT tokens
- **Role-Based Access Control** (Admin, HR, Employee)
- **Email verification** support
- **Password encryption** with bcryptjs

### 👤 Employee Profile Management
- View personal, job, and salary information
- Edit profile details (address, phone, etc.)
- Role-based profile visibility
- Professional profile interface

### 📋 Attendance Tracking
- Daily/Weekly attendance views
- Mark attendance with status (Present, Absent, Half-day, Leave)
- Check-in/Check-out timestamps
- Admin can view all employee attendance

### 🗓️ Leave & Time-Off Management
- Apply for multiple leave types (Paid, Sick, Unpaid, Casual)
- Set date ranges and number of days
- Track leave request status (Pending, Approved, Rejected)
- HR/Admin approval workflow
- Comments and remarks support

### 💰 Payroll Management
- View detailed salary information
- Breakdown of earnings and deductions
- Allowances (HRA, DA, etc.)
- Deductions (PF, Tax, Insurance)
- Payment status tracking

### 🎯 Admin/HR Dashboard
- Manage all employees
- Approve/Reject leave requests
- View attendance records
- Manage payroll
- System-wide insights

---

## 🛠️ Tech Stack

### Backend
- **Node.js** & **Express.js** - Server framework
- **MongoDB** - NoSQL Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests

### Frontend
- **Angular 16** - UI Framework
- **TypeScript** - Programming Language
- **RxJS** - Reactive Programming
- **Modern CSS3** - Advanced styling with animations
- **Responsive Design** - Mobile-friendly

---

## 📦 Installation

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
```

Configure `.env` file:
```
PORT=5000
MONGODB_URI=mongodb+srv://himanshukvarotariya_db_user:8ozm6rN1qPvQHnmL@secondcluster.mbntmff.mongodb.net/dayflow
JWT_SECRET=your_secret_key
JWT_EXPIRY=7d
```

Start the backend:
```bash
npm run dev  # Development mode with nodemon
npm start    # Production mode
```

### Frontend Setup

```bash
cd frontend
npm install
```

Start the frontend:
```bash
npm start
```

The app will be available at `http://localhost:4200`

---

## 📁 Project Structure

```
dayflow-hrms/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Attendance.js
│   │   ├── Leave.js
│   │   └── Payroll.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── employees.js
│   │   ├── attendance.js
│   │   ├── leave.js
│   │   └── payroll.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts
│   │   │   │   └── api.service.ts
│   │   │   ├── components/
│   │   │   │   ├── auth/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── profile/
│   │   │   │   ├── attendance/
│   │   │   │   ├── leave/
│   │   │   │   └── payroll/
│   │   │   ├── app.routes.ts
│   │   │   └── app.component.ts
│   │   ├── main.ts
│   │   ├── styles.css
│   │   └── index.html
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Login user
- `GET /api/auth/me` - Get current user

### Employees
- `GET /api/employees` - Get all employees (Admin)
- `GET /api/employees/:id` - Get employee profile
- `PUT /api/employees/:id` - Update profile
- `PUT /api/employees/:id/salary` - Update salary (Admin)

### Attendance
- `GET /api/attendance/my-attendance` - Get my attendance
- `GET /api/attendance/all` - Get all attendance (Admin)
- `POST /api/attendance` - Mark attendance
- `PUT /api/attendance/:id` - Update attendance (Admin)

### Leave
- `POST /api/leave/apply` - Apply for leave
- `GET /api/leave/my-leaves` - Get my leaves
- `GET /api/leave/all` - Get all leaves (Admin)
- `PUT /api/leave/:id/approve` - Approve/Reject leave (Admin)

### Payroll
- `GET /api/payroll/my-payroll` - Get my payroll
- `GET /api/payroll/all` - Get all payroll (Admin)
- `POST /api/payroll/:employeeId` - Create payroll (Admin)

---

## 🎨 UI/UX Features

### Modern Design
- **Gradient backgrounds** - Professional purple gradient theme
- **Card-based layout** - Clean, organized interface
- **Smooth animations** - Engaging transitions and hover effects
- **Responsive design** - Works on desktop, tablet, and mobile
- **Dark-friendly colors** - Easy on the eyes

### Interactive Components
- Hover effects on cards and buttons
- Loading states for async operations
- Status badges with color coding
- Progress indicators
- Form validation feedback

### Accessibility
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- High contrast colors
- Clear visual hierarchy

---

## 🔒 Security Features

- ✅ JWT token-based authentication
- ✅ Password hashing with bcryptjs
- ✅ Role-based access control
- ✅ Protected API routes
- ✅ Environment variable configuration
- ✅ CORS protection

---

## 👥 User Roles

### Employee
- View personal profile
- Track own attendance
- Apply for leaves
- View salary information
- Check leave status

### HR Officer
- Manage employees
- Approve/Reject leave requests
- View all attendance records
- Manage payroll
- Generate reports

### Admin
- Full system access
- Create/Edit employees
- Override any decision
- System configuration
- Data management

---

## 🚀 Getting Started

### Quick Start
1. Clone the repository
2. Install dependencies for both backend and frontend
3. Configure MongoDB connection in `.env`
4. Start backend server: `npm run dev` (backend folder)
5. Start frontend: `npm start` (frontend folder)
6. Open http://localhost:4200 in your browser
7. Sign up or sign in with test credentials

### Test Credentials
```
Email: demo@dayflow.com
Password: demo123456
Role: Employee
```

---

## 📊 Database Models

### User
- Employee ID, Email, Password
- Personal Info (First Name, Last Name, Phone, Address)
- Job Info (Department, Position, Joining Date)
- Salary Structure (Base, Allowances, Deductions)
- Role and Status

### Attendance
- Employee reference
- Date and Status
- Check-in/Check-out times
- Remarks

### Leave
- Employee reference
- Leave type and dates
- Number of days
- Status and approver
- Comments

### Payroll
- Employee reference
- Month/Year
- Earnings breakdown
- Deductions breakdown
- Payment status

---

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Verify connection string in `.env`
- Check MongoDB Atlas IP whitelist
- Ensure network connectivity

### CORS Errors
- Backend and frontend ports may conflict
- Verify proxy configuration
- Check CORS middleware in Express

### Authentication Issues
- Clear browser local storage
- Verify JWT secret matches
- Check token expiry settings

---

## 📝 Notes

- Default passwords should be changed for security
- Implement email verification for production
- Add SSL/TLS for production deployment
- Set up proper logging and monitoring
- Regular database backups recommended

---

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

## 📄 License

This project is open source and available under the MIT License.

---

## 📞 Support

For support, email support@dayflow.com or create an issue in the repository.

---

**Built with ❤️ for HR Excellence**
