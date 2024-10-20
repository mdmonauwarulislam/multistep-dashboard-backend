
---

# Multi-Step Dashboard Backend (Node.js + Express + MongoDB)

This backend provides essential user authentication and user management using **Node.js**, **Express**, and **MongoDB**. It includes JWT-based authentication for secure access to user data.

## Features

- **User Registration**: Allows new users to register with their information.
- **JWT Authentication**: Secures routes with JSON Web Tokens.
- **User Data Management**: Fetch and update user details via protected routes.

## Tech Stack

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database for storing user information
- **Mongoose**: MongoDB ORM for schema management
- **JWT**: JSON Web Tokens for authentication

## API Endpoints

### 1. User Registration

**POST** `/api/register`  
Registers a new user and stores the details in MongoDB.

- **Request Body**:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  - `201 Created`: Successfully registered the user.

---

### 2. User Login

**POST** `/api/login`  
Authenticates the user with email and password, and returns a JWT token.

- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  - `200 OK`: Returns a JWT token.
  ```json
  {
    "token": "your_jwt_token"
  }
  ```

---

### 3. Get User Information (Protected)

**GET** `/api/user/:id`  
Fetches the information of the user with the specified ID.

- **Headers**:  
  Authorization: `Bearer your_jwt_token`
- **Response**:
  - `200 OK`: Returns the user information.
  ```json
  {
    "_id": "user_id",
    "username": "string",
    "email": "string"
  }
  ```

---

### 4. Update User Information (Protected)

**PUT** `/api/user/:id`  
Allows the user to update their details.

- **Headers**:  
  Authorization: `Bearer your_jwt_token`
- **Request Body**:
  ```json
  {
    "username": "string",
    "email": "string"
  }
  ```
- **Response**:
  - `200 OK`: Returns the updated user details.

---

## Project Structure

```
├── config/
│   └── db.js             # MongoDB connection
├── controllers/
│   └── authController.js  # Handles user registration and login
│   └── userController.js  # Handles fetching and updating user details
├── middlewares/
│   └── authMiddleware.js  # JWT authentication middleware
├── models/
│   └── userModel.js       # Mongoose schema for user
├── routes/
│   └── authRoutes.js      # Routes for register and login
│   └── userRoutes.js      # Routes for fetching and updating user details
├── app.js                 # Main application entry
└── package.json           # Dependencies and scripts
```

## Installation

### Prerequisites

- **Node.js** (version >= 14)
- **MongoDB** (local or cloud)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/multi-step-dashboard-backend.git
   cd multi-step-dashboard-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in `.env`:
   ```plaintext
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Run the server:
   ```bash
   npm start
   ```

5. The backend will be running at `http://localhost:5000`.

## License

This project is licensed under the MIT License.

---
