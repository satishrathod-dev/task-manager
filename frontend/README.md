# 🚀 Task Manager (MERN Stack)

A full-stack **Task Manager** application built using the **MERN (MongoDB, Express.js, React.js, Node.js) stack**. This application allows users to create, update, delete, and manage tasks efficiently with authentication and a modern UI.

## 🔹 Features

✅ **User Authentication** (Signup/Login with JWT)  
✅ **Task Management** (Create, Edit, Delete, Mark as Completed)  
✅ **Role-Based Access Control** (Users/Admins)  
✅ **Responsive UI** built with Tailwind CSS  
✅ **RESTful API** for backend communication  
✅ **Context API** for state management  
✅ **MongoDB** for data storage  

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, Context API  
- **Backend**: Node.js, Express.js, MongoDB  
- **Database**: MongoDB Atlas / Local MongoDB  
- **Authentication**: JWT (JSON Web Token)  

---

## 📌 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)  
- **npm** (v6 or higher)  
- **MongoDB** (Local or Atlas)  

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/task-manager.git
   cd task-manager
   ```

2. **Install dependencies**:

   ```bash
   cd frontend
   npm install
   
   cd backend
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the backend directory and add the following:

   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

4. **Start the application**:

   - **Backend**:
     ```bash
     cd backend
     npm start
     ```
   
   - **Frontend**:
     ```bash
     cd frontend
     npm start
     ```

5. **Open your browser and navigate to:**
   👉 [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```bash
task-manager/
│── frontend/       # React.js frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Application pages (Home, Login, Signup)
│   │   ├── context/     # Context API for state management
│   │   ├── App.js       # Main app component
│   │   ├── index.js     # Entry point
│   ├── package.json
│   ├── .env
│── backend/        # Express.js backend
│   ├── models/     # Mongoose models
│   ├── routes/     # API routes
│   ├── controllers/ # Business logic
│   ├── server.js   # Main backend entry point
│   ├── .env
│── README.md       # Project documentation
```

---

## 📜 API Endpoints

### **User Authentication**
- **Signup**: `POST /api/users/signup`
- **Login**: `POST /api/users/login`
- **Get User Profile**: `GET /api/users/me` (Protected)

### **Task Management**
- **Create Task**: `POST /api/tasks`
- **Get All Tasks**: `GET /api/tasks`
- **Update Task**: `PUT /api/tasks/:id`
- **Delete Task**: `DELETE /api/tasks/:id`




---

## 🔧 Available Scripts

### **Frontend Scripts**

- `npm start` - Runs the frontend in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production

### **Backend Scripts**

- `npm start` - Runs the backend server
- `npm run dev` - Runs the backend with nodemon

---

## 📚 Learn More

- [React.js Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Node.js Documentation](https://nodejs.org/)
- [MongoDB Documentation](https://www.mongodb.com/docs/)

---

## 👨‍💻 Author

Developed by **Satish Rathod**

🚀 **Happy Coding!** 🚀