# 🌅 Dayflow HRMS - Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT LAYER                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │   Angular    │  │  TypeScript  │  │  Modern CSS3     │   │
│  │   Components │  │   Services   │  │  Responsive UI   │   │
│  └──────────────┘  └──────────────┘  └──────────────────┘   │
│         ↓                  ↓                    ↓             │
│  ┌────────────────────────────────────────────────────────┐  │
│  │              HTTP Communication Layer                  │  │
│  │  (JWT Token Auth, CORS, Interceptors)                 │  │
│  └────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                           ↓
                    [API GATEWAY]
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                      SERVER LAYER                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │  Express.js  │  │  Middleware  │  │  Route Handlers  │   │
│  │   Server     │  │  (Auth, CORS)│  │  (API Endpoints) │   │
│  └──────────────┘  └──────────────┘  └──────────────────┘   │
│         ↓                  ↓                    ↓             │
│  ┌────────────────────────────────────────────────────────┐  │
│  │         Business Logic & Database Layer                │  │
│  │  (Model Operations, Validations, Security)             │  │
│  └────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                           ↓
                    [MONGOOSE ODM]
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                    DATABASE LAYER                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │  MongoDB     │  │  Collections │  │  Indexes         │   │
│  │  Atlas       │  │  (Users,     │  │  (Performance)   │   │
│  │  Cloud       │  │   Attendance)│  │                  │   │
│  └──────────────┘  └──────────────┘  └──────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
App Component
├── Auth Components
│   ├── SignUp
│   └── SignIn
│
├── Dashboard Component
│   ├── Sidebar Navigation
│   ├── Header
│   └── Dashboard Grid
│
└── Main Application
    ├── Profile Component
    ├── Attendance Component
    ├── Leave Component
    └── Payroll Component
```

## Data Flow

### Authentication Flow
```
User Input
    ↓
SignIn/SignUp Component
    ↓
AuthService.signin() / signup()
    ↓
HTTP POST to /api/auth/signin
    ↓
Express Server validates credentials
    ↓
Returns JWT Token + User Data
    ↓
Store in localStorage
    ↓
Update AuthService.currentUser$
    ↓
Navigate to Dashboard
```

### Data Fetch Flow
```
Component.ngOnInit()
    ↓
ApiService.getEmployees()
    ↓
HTTP Interceptor adds JWT Token
    ↓
Express Server (Protected Route)
    ↓
Middleware validates JWT
    ↓
Fetch from MongoDB
    ↓
Return Response
    ↓
Component receives data
    ↓
Render in Template
```

## Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  employeeId: String (Unique),
  email: String (Unique),
  password: String (Hashed),
  firstName: String,
  lastName: String,
  role: String (enum: ['employee', 'hr', 'admin']),
  department: String,
  position: String,
  phone: String,
  address: String,
  profilePicture: String (Base64),
  salary: {
    baseSalary: Number,
    allowances: Number,
    deductions: Number,
    netSalary: Number
  },
  joiningDate: Date,
  emailVerified: Boolean,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Attendance Collection
```javascript
{
  _id: ObjectId,
  employeeId: ObjectId (ref: User),
  date: Date,
  status: String (enum: ['present', 'absent', 'half-day', 'leave']),
  checkInTime: Date,
  checkOutTime: Date,
  remarks: String,
  createdAt: Date
}
```

### Leave Collection
```javascript
{
  _id: ObjectId,
  employeeId: ObjectId (ref: User),
  leaveType: String (enum: ['paid', 'sick', 'unpaid', 'casual']),
  startDate: Date,
  endDate: Date,
  numberOfDays: Number,
  reason: String,
  status: String (enum: ['pending', 'approved', 'rejected']),
  approvedBy: ObjectId (ref: User),
  comments: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Payroll Collection
```javascript
{
  _id: ObjectId,
  employeeId: ObjectId (ref: User),
  month: Number,
  year: Number,
  baseSalary: Number,
  allowances: {
    hra: Number,
    da: Number,
    other: Number
  },
  deductions: {
    pf: Number,
    tax: Number,
    insurance: Number,
    other: Number
  },
  totalEarnings: Number,
  totalDeductions: Number,
  netSalary: Number,
  paymentStatus: String (enum: ['pending', 'processed', 'paid']),
  paymentDate: Date,
  createdAt: Date
}
```

## Security Implementation

### Authentication & Authorization
```
┌─────────────────────────────────────┐
│    User Login with Credentials      │
└────────────┬────────────────────────┘
             ↓
┌─────────────────────────────────────┐
│   Verify Email & Password Against   │
│   Bcrypt Hashed Password in DB      │
└────────────┬────────────────────────┘
             ↓
┌─────────────────────────────────────┐
│   Generate JWT Token with User ID   │
│   & Role Information                │
└────────────┬────────────────────────┘
             ↓
┌─────────────────────────────────────┐
│   Store Token in Client localStorage│
│   Add to Authorization Header       │
└────────────┬────────────────────────┘
             ↓
┌─────────────────────────────────────┐
│   Middleware Validates Token on     │
│   Every Protected Route             │
└────────────┬────────────────────────┘
             ↓
┌─────────────────────────────────────┐
│   Role-Based Access Control Check   │
│   (Employee vs Admin/HR)            │
└─────────────────────────────────────┘
```

## API Request/Response Cycle

```
CLIENT REQUEST
  ↓
┌──────────────────────────────┐
│ 1. HTTP Client prepares req  │
│ 2. Add JWT in headers        │
│ 3. Send to backend           │
└──────────────────────────────┘
  ↓
SERVER (Express)
  ↓
┌──────────────────────────────┐
│ 1. CORS middleware check     │
│ 2. Parse request body        │
│ 3. Extract JWT from header   │
└──────────────────────────────┘
  ↓
┌──────────────────────────────┐
│ Authentication Middleware    │
│ - Verify JWT signature       │
│ - Check token expiry         │
│ - Extract user ID & role     │
└──────────────────────────────┘
  ↓
┌──────────────────────────────┐
│ Authorization Middleware     │
│ - Check user role            │
│ - Validate permissions       │
│ - Allow/Deny access          │
└──────────────────────────────┘
  ↓
┌──────────────────────────────┐
│ Route Handler                │
│ - Execute business logic     │
│ - Query MongoDB              │
│ - Transform response         │
└──────────────────────────────┘
  ↓
┌──────────────────────────────┐
│ Send Response                │
│ - HTTP Status Code           │
│ - JSON Body                  │
│ - Headers                    │
└──────────────────────────────┘
  ↓
CLIENT RESPONSE
  ↓
┌──────────────────────────────┐
│ 1. Receive response          │
│ 2. Check status code         │
│ 3. Parse JSON                │
│ 4. Update component state    │
│ 5. Re-render UI              │
└──────────────────────────────┘
```

## Performance Optimizations

### Frontend
- Angular lazy loading modules
- OnPush change detection strategy
- RxJS subscription management
- Component memoization

### Backend
- MongoDB indexing on frequently queried fields
- Request validation before DB queries
- Connection pooling
- Response compression (gzip)

### Database
- Indexes on: email, employeeId, employeeId (in Attendance/Leave)
- Query optimization with lean() in Mongoose
- Pagination for large datasets

## Error Handling

```
ERROR OCCURRENCE
    ↓
┌──────────────────────────────────┐
│ Server Middleware catches error  │
└──────────────┬───────────────────┘
               ↓
┌──────────────────────────────────┐
│ Log error for debugging          │
│ Generate error code              │
│ Prepare user-friendly message    │
└──────────────┬───────────────────┘
               ↓
┌──────────────────────────────────┐
│ Send HTTP Error Response         │
│ (Status code, message, details)  │
└──────────────┬───────────────────┘
               ↓
┌──────────────────────────────────┐
│ Client receives error            │
│ Display in UI                    │
│ Log for debugging                │
└──────────────────────────────────┘
```

## Scalability Considerations

1. **Horizontal Scaling**
   - Stateless backend servers
   - Load balancer distribution
   - Session management via JWT

2. **Database Scaling**
   - MongoDB sharding
   - Read replicas
   - Connection pooling

3. **Caching**
   - Redis for session storage
   - Browser cache for static assets
   - API response caching

4. **Monitoring**
   - Error tracking (Sentry)
   - Performance monitoring (APM)
   - Log aggregation

---

**End of Architecture Documentation**
