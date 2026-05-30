# Aura — Engineering Marketplace

## 🚀 Live Demo

https://auranextgen.vercel.app/

## 📖 Overview

Aura is a Fiverr-inspired full-stack freelance marketplace platform where Buyers can post engineering-related tasks, Solvers can browse and apply for available opportunities, and Administrators manage platform operations. The platform provides a complete freelance workflow, secure authentication, role-based dashboards, and a modern user experience.

---

## ✨ Key Features

### Complete Freelance Workflow

* Buyers create and publish tasks
* Solvers browse available opportunities
* Solvers submit applications/bids
* Buyers assign tasks to selected solvers
* Solvers submit deliverables
* Buyers review completed work
* Track task progress from creation to completion

### Role-Based Access Control (RBAC)

#### Buyer Dashboard

* Create Tasks
* Manage Posted Tasks
* Review Applications
* Assign Solvers
* Track Task Progress

#### Solver Dashboard

* Browse Tasks
* Apply for Tasks
* View Assigned Work
* Submit Deliverables
* Monitor Submission Status

#### Admin Dashboard

* Manage Users
* Monitor Marketplace Activities
* Moderate Tasks
* Platform Management

### Authentication & Security

* JWT Authentication
* Protected Routes
* Secure Login & Registration
* Role-Based Permissions
* Backend Authorization Middleware

### Notification System

* Task Assignment Notifications
* Application Status Updates
* Submission Alerts
* Activity Tracking with MongoDB

### Modern UI/UX

* Glassmorphism Design
* Framer Motion Animations
* Fully Responsive Layout
* Dark Theme Interface
* Optimized User Experience

---

## 🛠 Tech Stack

### Frontend

* Next.js
* React.js
* JavaScript
* Tailwind CSS
* Framer Motion
* Axios

### Backend

* Node.js
* Express.js
* JWT Authentication

### Database

* MongoDB
* Mongoose

---

## 📂 Project Structure

```text
client/
├── components/
├── pages/
├── hooks/
├── layouts/
└── services/

server/
├── controllers/
├── routes/
├── middleware/
├── models/
└── services/
```

## ⚙️ Installation

### Clone Repository

```bash
git clone <repository-url>
cd aura
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
CLIENT_URL=your_client_url
```

### Run Development Server

```bash
npm run dev
```

---

## 📦 Main Packages

### Frontend

```bash
npm install axios
npm install framer-motion
npm install react-hot-toast
npm install sweetalert2
```

### Backend

```bash
npm install express
npm install mongoose
npm install jsonwebtoken
npm install bcryptjs
npm install cors
npm install dotenv
```

---

## 🎯 Core Marketplace Flow

1. Buyer creates a task
2. Solvers apply for the task
3. Buyer reviews applications
4. Buyer assigns a solver
5. Solver completes the task
6. Solver submits deliverables
7. Buyer reviews and completes the workflow

---

## 🔮 Future Improvements

* Real-Time Chat System
* Video Meeting Integration
* Payment Gateway
* Review & Rating System
* AI-Powered Task Recommendations

---

## 👨‍💻 Author

MD Al Jihad Sawon

Full Stack Developer

LinkedIn:
https://www.linkedin.com/in/md-al-jihad-sawon-6a27482a3/
