# Authentication & Task Management System

A full-stack MERN application with JWT-based authentication, role-based access control, and task management features. Built in 3 days as part of a backend developer internship assignment.

##  Quick Start

### Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/KYkiran/Authentication-Testing.git
   cd Authentication-Testing
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment variables** (create `.env` in root):
   ```env
   PORT = ANY PORT NUMBER
   MONGO_URI = YOUR DATABASE URI
   JWT_SECRET = YOUR SECRET key
   NODE_ENV = development
   ```

4. **Start server:**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend folder:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start dev server:**
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

##  Project Structure

```
.
├── controllers/           # Business logic for auth, tasks, admin
├── models/               # Mongoose schemas (User, Task)
├── routes/               # API routes (auth, tasks, admin)
├── middleware/           # Auth & role validation middleware
├── validators/           # Input validation rules
├── lib/                  # Utilities (JWT, cookies)
├── frontend/
│   ├── src/
│   │   ├── api/          # Axios instance with credentials
│   │   ├── context/      # Auth context & state
│   │   ├── pages/        # Login, Register, Dashboard, Admin
│   │   ├── components/   # Protected routes
│   │   └── main.jsx      # Router setup
│   └── tailwind.config.js
├── server.js             # Express app & startup
├── .env                  # Environment variables
└── README.md             # This file
```

##  Authentication & Security

### JWT + HttpOnly Cookies
- JWT tokens stored in **HttpOnly cookies** (prevents XSS attacks)
- Cookies sent automatically with `withCredentials: true` in Axios
- 7-day expiration on tokens
- SameSite=Lax policy for CSRF protection

### Password Security
- Bcrypt hashing with 10 salt rounds
- Minimum 6 characters required
- Hashed before storage in database

### Role-Based Access Control
- **User** (default): CRUD own tasks
- **Admin**: CRUD all tasks & manage users

## API Endpoints

### Auth
```
POST   /api/v1/auth/register      # Register new user
POST   /api/v1/auth/login         # Login (sets JWT cookie)
POST   /api/v1/auth/logout        # Logout (clears cookie)
```

### Tasks (Protected)
```
GET    /api/v1/tasks              # Get user/all tasks
POST   /api/v1/tasks              # Create task
PUT    /api/v1/tasks/:id          # Update task (owner/admin)
DELETE /api/v1/tasks/:id          # Delete task (owner/admin)
```

### Admin (Admin Only)
```
GET    /api/v1/admin/users        # Get all users
GET    /api/v1/admin/tasks        # Get all tasks with creator info
DELETE /api/v1/admin/users/:id    # Delete user & their tasks
```

## Key Features

✓ JWT Authentication with secure cookie storage
✓ Role-based access control (user, admin)
✓ Task CRUD with ownership validation
✓ Input validation using express-validator
✓ MongoDB + Mongoose ODM
✓ React frontend with Tailwind CSS
✓ Protected routes & auth context
✓ CORS configured for frontend
✓ Proper HTTP status codes
✓ Error handling with validation details

## Sample Requests

### Register
```bash
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create Task (with cookie)
```bash
curl -X POST http://localhost:8000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "title": "Complete assignment",
    "description": "Finish full-stack app",
    "status": "pending"
  }'
```


## Tech Stack

### Backend
- **Runtime**: Node.js + Express.js
- **Database**: MongoDB + Mongoose
- **Auth**: JWT + bcrypt + cookie-parser
- **Validation**: express-validator
- **CORS**: cors middleware

### Frontend
- **Framework**: React 18 + Vite
- **Router**: React Router v6
- **Styling**: Tailwind CSS
- **HTTP**: Axios with credentials
- **State**: Context API

## User Roles

### User (default)
- Register & login
- Create own tasks
- View & edit own tasks
- Delete own tasks

### Admin
- All user permissions
- View all users
- View all tasks
- Edit/delete any task
- Delete users

## Troubleshooting

### "Cannot POST /api/v1/auth/register"
- Ensure backend running on port 8000
- Check baseURL in `frontend/src/api/axios.js`

### "401 Unauthorized"
- Token expired? Login again
- Check `withCredentials: true` in Axios
- Verify CORS `origin` matches frontend URL

### "Tailwind styles not showing"
- Run `npm run dev` in frontend folder
- Clear browser cache (Ctrl+Shift+Delete)
- Ensure `index.css` has @tailwind directives

### CORS Error
- Backend `origin` must match frontend URL
- Ensure `credentials: true` in both

## 🔗 Assignment Checklist

-  REST API with Express & MongoDB
-  JWT authentication with HttpOnly cookies
-  Role-based access control
-  CRUD operations for tasks
-  Input validation & error handling
-  React frontend with Tailwind CSS
-  Protected routes
-  API documentation
-  Scalability notes
-  GitHub with clear structure

---
