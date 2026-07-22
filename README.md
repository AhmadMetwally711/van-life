# 🚐 Van Life

A full-stack van rental application that allows users to explore available vans, filter by type, rent vans for specific dates, manage bookings, and save favorite vans.

Built with React, Express.js, and PostgreSQL.

---

## 🌐 Live Demo

Frontend:
https://van-life-i7w283v15-ahmad-metwally.vercel.app/

Backend:
https://van-life-i7ca.onrender.com/


# 🔑 Demo Account

Use the following account to explore the host features of the application:

### Host Account

Email:
```
ahmed@test.com
```

Password:
```
123456
```

This account includes sample vans so you can test:

- Host Dashboard
- View Host Vans
- Add New Vans
- Manage Rentals
- View Income
- View Reviews


## 📸 Screenshots

Coming soon...

---

# ✨ Features

## 🔐 Authentication

- User login system
- Session-based authentication
- Protected user actions
- User-specific rentals and favorites

---

## 🚐 Van Browsing

- Browse all available vans
- View detailed van information
- Filter vans by type:
  - Simple
  - Luxury
  - Rugged

---

## 📅 Rental System

- Rent vans by selecting:
  - Start date
  - End date
- Automatically calculate:
  - Number of rental days
  - Total rental cost
- View all personal rentals
- Cancel existing rentals
- Track rental status

---

## ❤️ Favorites System

- Add vans to favorites
- Remove vans from favorites
- View saved favorite vans
- Favorites are stored permanently in the database

---

## 👤 User Dashboard

Users can:

- View their rentals
- View favorite vans
- Manage bookings
- Cancel rentals

---

## 🏕️ Host Dashboard

Hosts can:

- View dashboard overview
- Manage their vans
- Add new vans
- View income statistics
- View customer reviews


# 🛠️ Tech Stack

## Frontend

- React
- React Router
- Vite
- JavaScript (ES6+)
- CSS
- React Icons

---

## Backend

- Node.js
- Express.js
- REST API
- Express Session
- CORS

---

## Database

- PostgreSQL

Database features:

- Relational data modeling
- SQL queries
- Joins
- Foreign keys
- User-specific data handling
- PostgreSQL Session Store
- bcrypt password hashing
- Environment variables

---

# 📂 Project Structure

```text
Van-Life
│
├── assets
├── components
├── pages
├── server
│   ├── db
│   │   └── db.js
│   ├── package.json
│   └── server.js
│
├── api.js
├── index.jsx
├── index.css
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
├── .env
├── .gitignore
└── README.md
```
```

---

# ⚙️ Installation

## Clone the repository

```bash
git clone https://github.com/AhmadMetwally711/van-life.git
```

---

# Frontend Setup

Navigate to the client folder:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=your_backend_url
```

Run the development server:

```bash
npm run dev
```

---

# Backend Setup

Navigate to the server folder:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
DATABASE_URL=your_postgresql_database_url

SESSION_SECRET=your_secret_key
```

Run the backend server:

```bash
npm start
```

---

# 🔌 API Endpoints

## Vans

### Get all vans

```
GET /api/vans
```

### Get single van

```
GET /api/vans/:id
```

---

## Rentals

### Create rental

```
POST /api/rentals
```

### Get user rentals

```
GET /api/rentals
```

### Cancel rental

```
DELETE /api/rentals/:id
```

---

## Favorites

### Add favorite

```
POST /api/favorites
```

### Get favorites

```
GET /api/favorites
```

### Remove favorite

```
DELETE /api/favorites/:vanId
```

---

# 🚀 Deployment

Frontend:

- Vercel

Backend:

- Render

Database:

- PostgreSQL

---

# 📚 What I Learned

Through building this project, I practiced:

- Building full-stack applications
- Creating REST APIs
- Connecting React applications with backend services
- Working with PostgreSQL databases
- Authentication and session management
- CRUD operations
- Database relationships
- React state management
- React Router navigation
- Handling user-specific data
- Deploying full-stack applications

---

# 👨‍💻 Author

Ahmad Metwally

GitHub:
https://github.com/AhmadMetwally711

LinkedIn:
https://linkedin.com/in/yourprofile
