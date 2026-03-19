Express REST API - User Management

This project is a simple yet robust REST API built with Node.js and Express.js. It allows basic user management operations and includes security best practices, validation, and error handling.

---

Features

* CRUD operations for users
* Batch user creation
* External API integration (Random User API)
* Input validation and sanitization
* Security with Helmet and CORS
* Centralized error handling
* Request logging with Winston

---

Technologies Used

* Node.js
* Express.js
* SQLite (better-sqlite3)
* Axios
* Helmet
* CORS
* Express Validator
* Winston

---

Project Structure

```
src/
│
├── app.js
├── database/
│   └── database.js
├── routes/
│   └── user.routes.js
├── controllers/
│   └── users.controller.js
├── services/
│   └── users.service.js
├── middlewares/
│   ├── error.middleware.js
│   └── validate.middleware.js
├── utils/
│   ├── errors.js
│   └── logger.js
```

---

Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd <project-folder>
```

2. Install dependencies:

```bash
npm install
```

---

Running the Application

```bash
node src/app.js
```

Or (if using nodemon):

```bash
npm run dev
```

The server will run on:

```
http://localhost:3000
```

---

📡 API Endpoints

Users CRUD

| Method | Endpoint   | Description       |
| ------ | ---------- | ----------------- |
| GET    | /users     | Get all users     |
| GET    | /users/:id | Get user by ID    |
| POST   | /users     | Create a new user |
| PUT    | /users/:id | Update a user     |
| DELETE | /users/:id | Delete a user     |

---

Batch Users

POST /users/batch-users**

Create multiple users at once.

```json
[
  { "name": "John", "email": "john@test.com" },
  { "name": "Jane", "email": "jane@test.com" }
]
```

---

Random Users

POST /users/random

Fetches random users from an external API and stores them locally.

---

Security

This project implements basic security best practices:

* Helmet → Adds secure HTTP headers
* CORS → Enables controlled cross-origin requests
* Express Validator → Validates and sanitizes input data

---

Error Handling

* Global error handling middleware
* Custom error classes:

  * `ValidationError`
  * `NotFoundError`
* Errors are logged using Winston

---

Logging

All requests and errors are logged using Winston:

* Console logging
* Error logs stored in `error.log`

---

Testing the API

You can test the endpoints using:

* Postman
* Thunder Client
* cURL

---

Data Storage

Users are stored in a SQLite database** for persistence.

---

Expected Behavior

* All endpoints return JSON responses
* Invalid input is rejected with proper error messages
* Requests are logged in the console
* Errors are handled and logged properly
* Security middleware is applied globally

---

Author

Developed as part of a backend training challenge using Express.js.

---
