📝 Todoly API

Backend API for the Todoly Task Management App, built with Node.js, Express, and MongoDB. Supports CRUD operations for tasks with calendar functionality.

<p align="center"> <img src="https://img.shields.io/badge/Node.js-v18-green?style=flat-square" alt="Node.js"/> <img src="https://img.shields.io/badge/Express-v4.18.2-blue?style=flat-square" alt="Express"/> <img src="https://img.shields.io/badge/MongoDB-v6.0-success?style=flat-square" alt="MongoDB"/> </p>
✨ Features

CRUD operations for tasks

Task fields: title, description, status, priority, tags, date, start/end time

Calendar-friendly date/time support

Clean and scalable project structure

⚙️ Installation

Clone the repository

git clone https://github.com/your-username/todoly-api.git
cd todoly-api

Install dependencies

npm install

Configure environment variables
Create a .env file at the root:

MONGO_URI=mongodb://localhost:27017/manage-task
PORT=5000

Start the server

npm run start

# or if using nodemon

nodemon index.js

Server will run at: http://localhost:5000

🛠️ API Endpoints
Method Endpoint Description
POST /api/tasks Create a new task
GET /api/tasks Get all tasks
GET /api/tasks/:id Get a task by ID
PUT /api/tasks/:id Update a task by ID
DELETE /api/tasks/:id Delete a task by ID
💾 Dummy Data Example

POST /api/tasks

{
"title": "Finish React frontend",
"description": "Complete the calendar and to-do list views",
"status": "pending",
"priority": "high",
"tags": ["work", "urgent"],
"date": "2025-09-23",
"start_time": "10:00",
"end_time": "12:00"
}

Use Postman or curl to test the API.

📌 Notes

Make sure MongoDB is running locally.

Date and time fields are strings:

date: YYYY-MM-DD

start_time / end_time: HH:mm

Optional fields: description, tags, start_time, end_time.

🔧 Project Structure
todoly-api/
├─ config/ # DB connection
│ └─ db.js
├─ controllers/ # Task controllers
│ └─ taskController.js
├─ models/ # Mongoose models
│ └─ Task.js
├─ routes/ # API routes
│ └─ taskRoutes.js
├─ middlewares/ # Error handling
│ └─ errorMiddleware.js
├─ .env # Environment variables
├─ .gitignore
├─ index.js # Server entry point
└─ package.json

📦 Technologies Used

Node.js – JavaScript runtime

Express – Web framework

MongoDB – Database

Mongoose – MongoDB ODM

Cors – Cross-origin requests

dotenv – Environment variables
