# 🌅 Dayflow HRMS - Quick Reference Guide

## 🚀 Quick Start

```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm install
npm start
```

Access the application at: **http://localhost:4200**

---

## 📱 Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@dayflow.com | Admin@123456 |
| HR | hr@dayflow.com | HR@123456 |
| Employee | employee@dayflow.com | Emp@123456 |

*Note: Create new accounts via Sign Up page*

---

## 📂 Project Structure at a Glance

```
dayflow-hrms/
├── backend/          # Express + MongoDB
│   ├── models/       # Database schemas
│   ├── routes/       # API endpoints
│   ├── middleware/   # Auth & validation
│   └── server.js     # Main server file
│
├── frontend/         # Angular app
│   ├── src/app/
│   │   ├── services/ # Auth, API calls
│   │   └── components/ # UI components
│   └── angular.json  # Angular config
│
└── Documentation files
```

---

## 🎯 Key Features

| Feature | Path | Role |
|---------|------|------|
| Profile | `/profile` | All |
| Attendance | `/attendance` | All |
| Leave | `/leave` | All |
| Payroll | `/payroll` | All |
| Employees | `/employees` | Admin/HR |
| Dashboard | `/dashboard` | All |

---

## 🔌 API Quick Reference

```bash
# Sign Up
POST /api/auth/signup
Body: { employeeId, email, password, firstName, lastName, role }

# Sign In
POST /api/auth/signin
Body: { email, password }

# Get Employees
GET /api/employees
Header: Authorization: Bearer TOKEN

# Apply Leave
POST /api/leave/apply
Body: { leaveType, startDate, endDate, numberOfDays, reason }

# Mark Attendance
POST /api/attendance
Body: { date, status, checkInTime, checkOutTime }

# Get Payroll
GET /api/payroll/my-payroll
```

---

## ⚙️ Configuration Files

### Backend `.env`
```env
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dayflow
JWT_SECRET=your_secret_key
JWT_EXPIRY=7d
```

### Frontend
- API URL: `http://localhost:5000/api` (src/app/services/api.service.ts)

---

## 🛠️ Common Commands

```bash
# Backend
npm run dev          # Start with auto-reload
npm start            # Start production
npm install          # Install dependencies

# Frontend
npm start            # Start dev server
npm run build        # Build for production
npm test             # Run tests
```

---

## 🔍 Browser DevTools

### Check Network Requests
1. Open DevTools (F12)
2. Go to Network tab
3. Look for API calls to `localhost:5000`
4. Check headers for JWT token
5. View response data

### Console Debugging
```javascript
// Check if logged in
localStorage.getItem('token')

// Check user data
JSON.parse(localStorage.getItem('user'))

// Clear storage (to logout)
localStorage.clear()
```

---

## 🐛 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Port 5000 in use | `taskkill /PID <PID> /F` or change PORT in .env |
| Port 4200 in use | Check other Angular instances |
| MongoDB error | Verify connection string & network access |
| CORS error | Check backend is running, verify URL |
| Token invalid | Clear localStorage & login again |

---

## 🔐 Security Checklist

- ✅ Change default passwords
- ✅ Use strong JWT_SECRET
- ✅ Enable HTTPS in production
- ✅ Regular database backups
- ✅ Monitor failed login attempts
- ✅ Update dependencies regularly

---

## 📊 Database Quick Tips

```javascript
// Connect to MongoDB
mongodb://localhost:27017/dayflow

// Collections in database:
- users
- attendances
- leaves
- payrolls

// View with MongoDB Compass:
1. Connect to MongoDB
2. Select 'dayflow' database
3. Browse collections
```

---

## 🎨 UI/UX Features

- **Gradient backgrounds** - Purple theme
- **Responsive design** - Mobile optimized
- **Smooth animations** - Micro-interactions
- **Dark colors** - Easy on eyes
- **Status badges** - Color coded
- **Smooth transitions** - Professional feel

---

## 📝 Forms & Validations

### Profile Form
- Required: First Name, Last Name, Email
- Optional: Phone, Address, Profile Picture

### Leave Form
- Required: Leave Type, Start Date, End Date, Number of Days
- Optional: Reason

### Attendance Form
- Required: Date, Status
- Optional: Check-in/out times, Remarks

---

## 🔄 Data Relationships

```
User (1) ──────→ (N) Attendance
User (1) ──────→ (N) Leave
User (1) ──────→ (N) Payroll
Leave → approvedBy → User (HR/Admin)
```

---

## 🌐 Deployment Checklist

- [ ] Update JWT_SECRET for production
- [ ] Set production MongoDB URI
- [ ] Configure CORS properly
- [ ] Build frontend: `npm run build`
- [ ] Deploy backend to server
- [ ] Deploy frontend to hosting
- [ ] Setup SSL certificate
- [ ] Configure domain names
- [ ] Setup monitoring & logs
- [ ] Test all features

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| README.md | Project overview & features |
| SETUP.md | Installation & configuration |
| API_DOCUMENTATION.md | Complete API reference |
| ARCHITECTURE.md | System design & flow |
| This file | Quick reference |

---

## 💡 Tips & Tricks

1. **Profile Picture**: Upload as base64 encoded image
2. **Date Format**: Use ISO format (YYYY-MM-DD)
3. **Salary Calc**: Net = Base + Allowances - Deductions
4. **Leave Days**: Calculate automatically from dates
5. **Token Duration**: 7 days by default, customize in .env

---

## 🎓 Learning Resources

### Frontend (Angular)
- Angular docs: https://angular.io/docs
- TypeScript: https://www.typescriptlang.org/docs
- RxJS: https://rxjs.dev

### Backend (Node.js/Express)
- Express docs: https://expressjs.com
- MongoDB docs: https://docs.mongodb.com
- Mongoose: https://mongoosejs.com

### HTTP & APIs
- RESTful API design
- JWT tokens
- CORS & security

---

## 🆘 Support

### Error Messages
- **401 Unauthorized**: Login again, token expired
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource doesn't exist
- **500 Server Error**: Backend issue, check logs

### Debug Steps
1. Check browser console (F12)
2. Check Network tab for API calls
3. Verify MongoDB connection
4. Check backend logs
5. Clear cache & login again

---

## 📞 Getting Help

1. Read error messages carefully
2. Check API response in Network tab
3. Review console logs
4. Read this documentation
5. Check Git repository issues

---

**Happy coding! 🚀**

Last updated: January 3, 2026
