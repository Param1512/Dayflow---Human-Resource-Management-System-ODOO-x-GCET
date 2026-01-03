# 🚀 Dayflow HRMS - Setup Guide

## Quick Start (5 Minutes)

### 1️⃣ Prerequisites
```bash
# Verify Node.js installation
node --version  # Should be v14+
npm --version   # Should be v6+
```

### 2️⃣ Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Start development server
npm run dev
```

✅ Backend running at: http://localhost:5000
✅ Health check: http://localhost:5000/api/health

### 3️⃣ Frontend Setup

```bash
# Navigate to frontend folder (in new terminal)
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

✅ Frontend running at: http://localhost:4200

---

## 📊 Database Setup

### MongoDB Atlas (Cloud - Recommended)

1. **Create Account** at https://www.mongodb.com/cloud/atlas
2. **Create Cluster** - Free tier available
3. **Get Connection String**:
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string

4. **Update `.env` in backend**:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dayflow
   ```

### Local MongoDB

```bash
# Install MongoDB Community Edition
# Visit: https://docs.mongodb.com/manual/installation/

# Start MongoDB
mongod

# In backend/.env
MONGODB_URI=mongodb://localhost:27017/dayflow
```

---

## 🔐 Environment Variables

### Backend `.env` Template

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/dayflow

# JWT Configuration
JWT_SECRET=your_super_secret_key_change_this_in_production
JWT_EXPIRY=7d

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
EMAIL_FROM=noreply@dayflow.com
```

---

## 👤 Creating Test Users

### Via API (Postman or Thunder Client)

**Sign Up - POST** `http://localhost:5000/api/auth/signup`

```json
{
  "employeeId": "EMP001",
  "email": "admin@dayflow.com",
  "password": "Admin@123456",
  "firstName": "Admin",
  "lastName": "User",
  "role": "admin"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "...",
    "email": "admin@dayflow.com",
    "role": "admin"
  }
}
```

### Test Users

```
Admin User:
  Email: admin@dayflow.com
  Password: Admin@123456
  Role: admin

HR Officer:
  Email: hr@dayflow.com
  Password: HR@123456
  Role: hr

Employee:
  Email: employee@dayflow.com
  Password: Emp@123456
  Role: employee
```

---

## 📝 Common Commands

### Backend

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Install packages
npm install

# View logs
npm run dev  # Shows all console output
```

### Frontend

```bash
# Start dev server
npm start

# Build for production
npm run build

# Run tests
npm test

# Open in browser
# Automatically opens http://localhost:4200
```

---

## 🐛 Troubleshooting

### Port Already in Use

**Backend (Port 5000)**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

**Frontend (Port 4200)**
```bash
# Windows
netstat -ano | findstr :4200
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :4200
kill -9 <PID>
```

### MongoDB Connection Failed

```
Error: connect ECONNREFUSED 127.0.0.1:27017

Solution:
1. Check MongoDB is running
2. Verify connection string in .env
3. Check IP whitelist (if Atlas)
4. Verify credentials
```

### CORS Error

```
Error: Access to XMLHttpRequest blocked by CORS

Solution:
1. Ensure backend is running on port 5000
2. Check CORS middleware in server.js
3. Clear browser cache and restart
```

### Module Not Found

```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 🔑 Features Walkthrough

### 1. Authentication
- ✅ Sign up with Employee ID
- ✅ Email login
- ✅ JWT token storage
- ✅ Automatic logout on expiry

### 2. Dashboard
- ✅ Role-based welcome message
- ✅ Quick access cards
- ✅ Navigation to all modules

### 3. Profile Management
- ✅ View personal information
- ✅ Edit profile (employee level)
- ✅ View salary details
- ✅ Job information display

### 4. Attendance
- ✅ Mark daily attendance
- ✅ View attendance history
- ✅ Admin can modify records
- ✅ Status tracking

### 5. Leave Management
- ✅ Apply for various leave types
- ✅ Track leave status
- ✅ Admin approval workflow
- ✅ Leave history

### 6. Payroll
- ✅ View salary details
- ✅ Breakdown of earnings
- ✅ Deductions view
- ✅ Net salary calculation

---

## 🌐 Deployment (Production)

### Deploy Backend (Heroku/Railway)

```bash
# Login to service
heroku login

# Create app
heroku create dayflow-hrms-backend

# Set environment variables
heroku config:set MONGODB_URI=mongodb+srv://...
heroku config:set JWT_SECRET=your_production_secret

# Deploy
git push heroku main
```

### Deploy Frontend (Vercel/Netlify)

```bash
# Build production bundle
npm run build

# Deploy using CLI
npm install -g vercel
vercel --prod
```

---

## 📱 API Testing

### Using Postman

1. **Create Collection** - "Dayflow HRMS"
2. **Add Requests**:

```
POST http://localhost:5000/api/auth/signin
Body: {
  "email": "admin@dayflow.com",
  "password": "Admin@123456"
}

GET http://localhost:5000/api/employees
Headers: Authorization: Bearer <TOKEN>
```

### Using Thunder Client (VS Code)

1. Install Thunder Client extension
2. Create requests similarly
3. Save responses for reference

---

## 🎯 Next Steps

1. ✅ Install dependencies
2. ✅ Configure MongoDB
3. ✅ Set up environment variables
4. ✅ Create test users
5. ✅ Start both servers
6. ✅ Access application
7. ✅ Test all features

---

## 💡 Tips & Tricks

### Development
- Use Redux DevTools for state management
- Enable Network tab in DevTools for API debugging
- Use `console.log()` for debugging
- Check browser console for errors

### Database
- Use MongoDB Compass for local DB visualization
- MongoDB Atlas for cloud management
- Regular backups recommended
- Monitor query performance

### Performance
- Lazy load components in production
- Enable gzip compression
- Use CDN for static assets
- Optimize images

---

## 📞 Need Help?

1. Check console errors (F12)
2. Verify all ports are available
3. Check MongoDB connection
4. Review `.env` configuration
5. Check API response in Network tab
6. Read error messages carefully

---

**Happy coding! 🎉**
