# Final-Project-API

## Project Overview

The Exercise Tracker API is a backend RESTful service that allows users to track and manage their workouts. Users can log exercises, categorize workouts, and store workout history. The system is built with relational database structure and full CRUD functionality.

This project demonstrates backend development skills using Node.js, Express, Sequelize, and SQLite, including middleware, error handling, and testing.

## Features

- Full CRUD operations for Users, Exercises, and Logs
- Relational database with Sequelize
- Input validation and error handling
- RESTful API design
- Logging middleware
- Basic unit testing using Jest and Supertest

## Tech Stack

- Node.js
- Express.js
- Sequelize ORM
- SQLite
- Jest
- Supertest
- CORS
- dotenv

## Setup Instructions

### 1. Clone Repository

git clone <your-repo-url>
cd Final-Project-Part-1-MVP

### 2. Install Dependencies

npm install

### 3. Setup Database

npm run setup

### 4. Seed Database

npm run seed

### 5. Run Server

npm run dev

Server runs at:
http://localhost:3000

## API Endpoints

## USERS

| Method | Endpoint       | Description    |
| ------ | -------------- | -------------- |
| GET    | /api/users     | Get all users  |
| GET    | /api/users/:id | Get user by ID |
| POST   | /api/users     | Create user    |
| PUT    | /api/users/:id | Update user    |
| DELETE | /api/users/:id | Delete user    |

### Example Request

{
"name": "John Doe",
"email": "john@example.com"
}

## EXERCISES

| Method | Endpoint           | Description        |
| ------ | ------------------ | ------------------ |
| GET    | /api/exercises     | Get all exercises  |
| GET    | /api/exercises/:id | Get exercise by ID |
| POST   | /api/exercises     | Create exercise    |
| PUT    | /api/exercises/:id | Update exercise    |
| DELETE | /api/exercises/:id | Delete exercise    |

### Example Request

{
"name": "Running",
"category": "Cardio"
}

## LOGS

| Method | Endpoint      | Description   |
| ------ | ------------- | ------------- |
| GET    | /api/logs     | Get all logs  |
| GET    | /api/logs/:id | Get log by ID |
| POST   | /api/logs     | Create log    |
| PUT    | /api/logs/:id | Update log    |
| DELETE | /api/logs/:id | Delete log    |

### Example Request

{
"userId": 1,
"exerciseId": 1,
"duration": 30,
"date": "2026-01-01"
}

## Error Handling

All errors are returned in JSON format.

### 400 Bad Request

{
"error": "Missing required fields"
}

### 404 Not Found

{
"error": "Resource not found"
}

### 500 Server Error

{
"error": "Internal server error"
}

## Testing

Run tests with:

npm test

Tests are written using Jest and Supertest and cover:

- User CRUD operations
- Exercise CRUD operations
- Log CRUD operations
- Success and failure cases

## Postman Testing

Base URL:
http://localhost:3000/api

Test the following endpoints:

- /users
- /exercises
- /logs

Include:

- GET requests
- POST requests
- PUT requests
- DELETE requests

## Author

Kylie Mangini

## Status

- MVP Complete
- CRUD API Functional
- Database Connected
- Error Handling Implemented
- Testing Included
- Documentation Completed
