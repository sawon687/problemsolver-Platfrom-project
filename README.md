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

🚀 Final Tech Stack (UPDATED VERSION)
***Frontend
Next.js (App Router)
React.js
JavaScript
Tailwind CSS
Framer Motion
Axios
*** Backend (inside Next.js)
Next.js Route Handlers (app/api)
JWT Authentication
Middleware (route protection)
🗄 Database
MongoDB


---

## 📂 Project Structure

```text
app/
│
├── layout.js                     # ⭐ MAIN LAYOUT (ROOT LAYOUT)
├── page.js                       # Home / Landing
├── globals.css
├── not-found.jsx
│
│
├── (auth)/                       # Public auth routes (clean URL)
│   ├── login/
│   │   └── page.jsx
│   ├── register/
│   │   └── page.jsx
│
│
├── dashboard/                   # ⭐ MAIN DASHBOARD AREA
│   ├── layout.jsx               # Dashboard layout (sidebar + navbar)
│   ├── page.jsx                 # Dashboard home
│   │
│   ├── create-project/
│   │   └── page.jsx
│   │
│   ├── manage-project/
│   │   └── page.jsx
│   │
│   ├── manage-users/
│   │   └── page.jsx
│   │
│   ├── profile/
│   │   └── page.jsx
│   │
│   ├── my-requests/
│   │   └── page.jsx
│   │
│   ├── project-list/
│   │   └── page.jsx
│   │
│   ├── user-project/
│   │   └── page.jsx
│
│
├── about/
│   └── page.jsx
│
├── contact/
│   └── page.jsx
│
├── blog/
│   └── page.jsx
│
├── project/
│   └── page.jsx
│
├── notifications/
│   └── page.jsx
│
├── unauthorized/
│   └── page.jsx
│
│
├── api/                         # ⭐ BACKEND (Route Handlers)
│   ├── auth/
│   │   ├── login/route.js
│   │   ├── register/route.js
│   │   ├── session/route.js
│   │   └── logout/route.js
│   │
│   ├── projects/
│   │   ├── route.js
│   │   ├── create/route.js
│   │   ├── update/route.js
│   │   └── delete/route.js
│   │
│   ├── users/
│   │   ├── route.js
│   │   └── update/route.js
│
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
