# Internal Tech Issue Tracker API

A collaborative backend platform for software teams to report bugs, suggest features, and manage issue workflows efficiently.

---

# 🌐 Live URL



```txt
https://internal-tech-issue-tracker.vercel.app/
```

---

# 🚀 Features

## 🔐 Authentication & Authorization

- User registration and login
- JWT-based authentication
- Password hashing using bcrypt
- Protected private routes
- Role-based authorization system

---

## 👥 User Roles

### Contributor

- Register and log in
- Create issues
- View all issues
- Update own issues only when status is `open`

### Maintainer

- All contributor permissions
- Update any issue
- Delete any issue
- Manage issue workflow status

---

## 🐞 Issue Management

- Create bug reports and feature requests
- Get all issues
- Get single issue details
- Update issue information
- Delete issues
- Sorting and filtering support

---

## ⚡ Backend Architecture

- Modular architecture
- Raw SQL queries using `pg`
- PostgreSQL database
- Global error handling
- Custom middleware
- Reusable utilities
- TypeScript strict mode

---

# 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime Environment |
| TypeScript | Type Safety |
| Express.js | Backend Framework |
| PostgreSQL | Relational Database |
| pg | Native PostgreSQL Driver |
| bcrypt | Password Hashing |
| jsonwebtoken | JWT Authentication |
| http-status-codes | Standard HTTP Responses |
| dotenv | Environment Variable Management |
| cors | Cross-Origin Resource Sharing |


---


# 📦 Installation & Setup

## 1️⃣ Clone the Repository

```bash
git clone 
```

---

## 2️⃣ Move into the Project Directory

```bash
cd internal-tech-issue-tracker
```

---

## 3️⃣ Install Dependencies

```bash
npm install ....
```

---

## 4️⃣ Run Development Server

```bash
npm run dev
```

---

## 5️⃣ Build for Production

```bash
npm run build
```

---

## 6️⃣ Run Production Server

```bash
npm start
```

---

# 🗄️ Database Schema Summary

## 👤 Users Table

| Field | Type |
|---|---|
| id | SERIAL PRIMARY KEY |
| name | VARCHAR(100) |
| email | VARCHAR(255) UNIQUE |
| password | TEXT |
| role | contributor / maintainer |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

---

## 🐞 Issues Table

| Field | Type |
|---|---|
| id | SERIAL PRIMARY KEY |
| title | VARCHAR(150) |
| description | TEXT |
| type | bug / feature_request |
| status | open / in_progress / resolved |
| reporter_id | INTEGER |
| created_at | TIMESTAMP |
| updated_at | TIMESTAMP |

---

# 🔗 API Endpoints

## 🔐 Authentication Routes

### Register User

```http
POST /api/auth/signup
```

### Login User

```http
POST /api/auth/login
```

---

## 🐞 Issue Routes

### Create Issue

```http
POST /api/issues
```

### Get All Issues

```http
GET /api/issues
```

### Get Single Issue

```http
GET /api/issues/:id
```

### Update Issue

```http
PATCH /api/issues/:id
```

### Delete Issue

```http
DELETE /api/issues/:id
```

---

# 🔍 Query Parameters

## Sort Issues

```http
GET /api/issues?sort=newest
```

### Available Values

- newest
- oldest

---

## Filter by Type

```http
GET /api/issues?type=bug
```

### Available Values

- bug
- feature_request

---

## Filter by Status

```http
GET /api/issues?status=open
```

### Available Values

- open
- in_progress
- resolved

---

# 🔒 Authentication System

This project uses JWT-based authentication.

### Authentication Flow

1. User logs in with email and password
2. Server validates credentials
3. JWT token is generated
4. Client sends token in request headers
5. Server verifies token before protected operations

---

## Authorization Header Format

```txt
Authorization: token
```



