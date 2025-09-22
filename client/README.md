# Library Management System

A full-stack library management system built with **React**, **Express**, and **MongoDB**.

## Features

- User registration and login (JWT authentication)
- Add, update, delete books (CRUD)
- View, search, and filter books
- Pagination support

## Tech Stack

- Frontend: React, Axios
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT

## Setup Instructions

### Prerequisites

- Node.js & npm
- MongoDB installed locally or use MongoDB Compass

### Backend

1. Go to server folder:
    cd library-management-system
    cd server
   
2. Install dependencies:
    npm install

3. Create .env file:
4. 
    MONGO_URI="mongodb://127.0.0.1:27017/library"
    PORT=4000
    JWT_SECRET="your-secret-key"

5. Start server:
    npm run dev


### Frontend

1. Go to client folder:
    cd client

2. Install dependencies:
    npm install

3. Start client:
    npm run dev

4. Open browser at "http://localhost:5173"

## Usage

- Register a new user
- Login
- Add, edit, delete books
- Search by author
- Navigate pages using pagination
