# 📚 Dayflow HRMS - API Documentation

Base URL: `http://localhost:5000/api`

---

## 🔐 Authentication Endpoints

### Sign Up
**POST** `/auth/signup`

Create a new user account.

**Request Body:**
```json
{
  "employeeId": "EMP001",
  "email": "user@dayflow.com",
  "password": "SecurePass@123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "employee"
}
```

**Response (201):**
```json
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@dayflow.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "employee"
  }
}
```

---

### Sign In
**POST** `/auth/signin`

Authenticate user and get JWT token.

**Request Body:**
```json
{
  "email": "user@dayflow.com",
  "password": "SecurePass@123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@dayflow.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "employee",
    "profilePicture": null
  }
}
```

---

### Get Current User
**GET** `/auth/me`

Get authenticated user details.

**Headers:**
```
Authorization: Bearer <TOKEN>
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "employeeId": "EMP001",
  "email": "user@dayflow.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "employee",
  "department": "Engineering",
  "position": "Software Engineer",
  "phone": "+1234567890",
  "address": "123 Main St, City",
  "profilePicture": null,
  "salary": {
    "baseSalary": 50000,
    "allowances": 10000,
    "deductions": 5000,
    "netSalary": 55000
  },
  "joiningDate": "2023-01-15",
  "emailVerified": true,
  "isActive": true,
  "createdAt": "2023-01-15T10:30:00Z",
  "updatedAt": "2023-01-15T10:30:00Z"
}
```

---

## 👥 Employee Endpoints

### Get All Employees
**GET** `/employees`

Get list of all employees (Admin/HR only).

**Headers:**
```
Authorization: Bearer <ADMIN_TOKEN>
```

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "employeeId": "EMP001",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@dayflow.com",
    "department": "Engineering",
    "position": "Senior Developer",
    "salary": {
      "baseSalary": 60000,
      "allowances": 12000,
      "deductions": 6000,
      "netSalary": 66000
    }
  }
]
```

---

### Get Employee by ID
**GET** `/employees/:id`

Get specific employee details.

**Headers:**
```
Authorization: Bearer <TOKEN>
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "employeeId": "EMP001",
  "email": "john@dayflow.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "employee",
  "department": "Engineering",
  "position": "Senior Developer",
  "phone": "+1234567890",
  "address": "123 Main St, City",
  "salary": {
    "baseSalary": 60000,
    "allowances": 12000,
    "deductions": 6000,
    "netSalary": 66000
  },
  "joiningDate": "2023-01-15",
  "isActive": true
}
```

---

### Update Employee Profile
**PUT** `/employees/:id`

Update employee information.

**Headers:**
```
Authorization: Bearer <TOKEN>
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "address": "456 Oak Ave, City",
  "profilePicture": "base64_encoded_image"
}
```

**Response (200):**
```json
{
  "message": "Profile updated",
  "employee": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1234567890",
    "address": "456 Oak Ave, City"
  }
}
```

---

### Update Employee Salary
**PUT** `/employees/:id/salary`

Update salary structure (Admin only).

**Headers:**
```
Authorization: Bearer <ADMIN_TOKEN>
```

**Request Body:**
```json
{
  "baseSalary": 65000,
  "allowances": 13000,
  "deductions": 6500
}
```

**Response (200):**
```json
{
  "message": "Salary updated",
  "employee": {
    "salary": {
      "baseSalary": 65000,
      "allowances": 13000,
      "deductions": 6500,
      "netSalary": 71500
    }
  }
}
```

---

## 📋 Attendance Endpoints

### Get My Attendance
**GET** `/attendance/my-attendance`

Get current user's attendance records.

**Headers:**
```
Authorization: Bearer <TOKEN>
```

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "employeeId": "507f1f77bcf86cd799439011",
    "date": "2024-01-15",
    "status": "present",
    "checkInTime": "2024-01-15T09:00:00Z",
    "checkOutTime": "2024-01-15T17:30:00Z",
    "remarks": "Regular day"
  }
]
```

---

### Get All Attendance
**GET** `/attendance/all`

Get all attendance records (Admin only).

**Headers:**
```
Authorization: Bearer <ADMIN_TOKEN>
```

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "employeeId": {
      "_id": "507f1f77bcf86cd799439011",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@dayflow.com"
    },
    "date": "2024-01-15",
    "status": "present",
    "checkInTime": "2024-01-15T09:00:00Z",
    "checkOutTime": "2024-01-15T17:30:00Z"
  }
]
```

---

### Mark Attendance
**POST** `/attendance`

Mark attendance for a day.

**Headers:**
```
Authorization: Bearer <TOKEN>
```

**Request Body:**
```json
{
  "date": "2024-01-15",
  "status": "present",
  "checkInTime": "2024-01-15T09:00:00Z",
  "checkOutTime": "2024-01-15T17:30:00Z",
  "remarks": "On time"
}
```

**Response (201):**
```json
{
  "message": "Attendance marked",
  "attendance": {
    "_id": "507f1f77bcf86cd799439012",
    "employeeId": "507f1f77bcf86cd799439011",
    "date": "2024-01-15",
    "status": "present"
  }
}
```

---

### Update Attendance
**PUT** `/attendance/:id`

Update attendance record (Admin only).

**Headers:**
```
Authorization: Bearer <ADMIN_TOKEN>
```

**Request Body:**
```json
{
  "status": "half-day",
  "remarks": "Doctor appointment"
}
```

**Response (200):**
```json
{
  "message": "Attendance updated",
  "attendance": {
    "_id": "507f1f77bcf86cd799439012",
    "status": "half-day",
    "remarks": "Doctor appointment"
  }
}
```

---

## 🗓️ Leave Endpoints

### Apply for Leave
**POST** `/leave/apply`

Submit a leave request.

**Headers:**
```
Authorization: Bearer <TOKEN>
```

**Request Body:**
```json
{
  "leaveType": "paid",
  "startDate": "2024-02-01",
  "endDate": "2024-02-05",
  "numberOfDays": 5,
  "reason": "Vacation"
}
```

**Response (201):**
```json
{
  "message": "Leave request submitted",
  "leave": {
    "_id": "507f1f77bcf86cd799439013",
    "employeeId": "507f1f77bcf86cd799439011",
    "leaveType": "paid",
    "startDate": "2024-02-01",
    "endDate": "2024-02-05",
    "numberOfDays": 5,
    "status": "pending"
  }
}
```

---

### Get My Leave Requests
**GET** `/leave/my-leaves`

Get current user's leave requests.

**Headers:**
```
Authorization: Bearer <TOKEN>
```

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439013",
    "leaveType": "paid",
    "startDate": "2024-02-01",
    "endDate": "2024-02-05",
    "numberOfDays": 5,
    "reason": "Vacation",
    "status": "pending",
    "createdAt": "2024-01-20T10:00:00Z"
  }
]
```

---

### Get All Leave Requests
**GET** `/leave/all`

Get all leave requests (Admin only).

**Headers:**
```
Authorization: Bearer <ADMIN_TOKEN>
```

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439013",
    "employeeId": {
      "_id": "507f1f77bcf86cd799439011",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@dayflow.com"
    },
    "leaveType": "paid",
    "startDate": "2024-02-01",
    "status": "pending"
  }
]
```

---

### Approve/Reject Leave
**PUT** `/leave/:id/approve`

Approve or reject a leave request (Admin only).

**Headers:**
```
Authorization: Bearer <ADMIN_TOKEN>
```

**Request Body:**
```json
{
  "status": "approved",
  "comments": "Approved. Enjoy your vacation!"
}
```

**Response (200):**
```json
{
  "message": "Leave approved",
  "leave": {
    "_id": "507f1f77bcf86cd799439013",
    "status": "approved",
    "approvedBy": "507f1f77bcf86cd799439010",
    "comments": "Approved. Enjoy your vacation!"
  }
}
```

---

## 💰 Payroll Endpoints

### Get My Payroll
**GET** `/payroll/my-payroll`

Get current user's payroll records.

**Headers:**
```
Authorization: Bearer <TOKEN>
```

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439014",
    "employeeId": "507f1f77bcf86cd799439011",
    "month": 1,
    "year": 2024,
    "baseSalary": 60000,
    "allowances": {
      "hra": 6000,
      "da": 3000,
      "other": 3000
    },
    "deductions": {
      "pf": 3600,
      "tax": 2000,
      "insurance": 500,
      "other": 0
    },
    "totalEarnings": 72000,
    "totalDeductions": 6100,
    "netSalary": 65900,
    "paymentStatus": "paid"
  }
]
```

---

### Get All Payroll
**GET** `/payroll/all`

Get all payroll records (Admin only).

**Headers:**
```
Authorization: Bearer <ADMIN_TOKEN>
```

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439014",
    "employeeId": {
      "_id": "507f1f77bcf86cd799439011",
      "firstName": "John",
      "lastName": "Doe",
      "employeeId": "EMP001"
    },
    "month": 1,
    "year": 2024,
    "netSalary": 65900,
    "paymentStatus": "paid"
  }
]
```

---

### Create/Update Payroll
**POST** `/payroll/:employeeId`

Create or update payroll record (Admin only).

**Headers:**
```
Authorization: Bearer <ADMIN_TOKEN>
```

**Request Body:**
```json
{
  "month": 1,
  "year": 2024,
  "baseSalary": 60000,
  "allowances": {
    "hra": 6000,
    "da": 3000,
    "other": 3000
  },
  "deductions": {
    "pf": 3600,
    "tax": 2000,
    "insurance": 500,
    "other": 0
  },
  "paymentStatus": "paid"
}
```

**Response (201):**
```json
{
  "message": "Payroll saved",
  "payroll": {
    "_id": "507f1f77bcf86cd799439014",
    "employeeId": "507f1f77bcf86cd799439011",
    "month": 1,
    "year": 2024,
    "netSalary": 65900,
    "paymentStatus": "paid"
  }
}
```

---

## 🔄 Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Success |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid data |
| 401 | Unauthorized - No/invalid token |
| 403 | Forbidden - No permission |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal error |

---

## 🔒 Authentication

All protected endpoints require JWT token in header:

```
Authorization: Bearer <JWT_TOKEN>
```

Token is obtained from `/auth/signin` or `/auth/signup` response.

---

## ⚠️ Error Responses

**Standard Error Format:**

```json
{
  "message": "Error description",
  "error": "Detailed error message"
}
```

**Example:**

```json
{
  "message": "Invalid credentials",
  "error": "Email or password is incorrect"
}
```

---

## 🧪 Example Requests

### Using cURL

```bash
# Sign in
curl -X POST http://localhost:5000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"user@dayflow.com","password":"Pass@123"}'

# Get profile (with token)
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <TOKEN>"
```

### Using JavaScript Fetch

```javascript
// Sign in
fetch('http://localhost:5000/api/auth/signin', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@dayflow.com',
    password: 'Pass@123'
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

---

End of API Documentation
