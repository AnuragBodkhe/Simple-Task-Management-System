# Task Management System

A full-stack task management system built with Node.js, Express, MySQL, and Bootstrap.

## Features

- Responsive UI using Bootstrap 5
- CRUD operations for tasks
- Task prioritization (low, medium, high)
- Task status tracking (pending, in-progress, completed)
- RESTful API endpoints
- Dynamic templating with EJS
- MySQL database integration

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a MySQL database and run the SQL script:
   ```bash
   mysql -u root -p < database.sql
   ```
4. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update database credentials in `.env`

5. Start the server:
   ```bash
   npm start
   ```
   
   For development with auto-reload:
   ```bash
   npm run dev
   ```

## Project Structure

```
task-management-system/
├── config/
│   └── database.js
├── routes/
│   └── tasks.js
├── views/
│   ├── layout.ejs
│   └── tasks/
│       ├── index.ejs
│       ├── new.ejs
│       └── show.ejs
├── app.js
├── database.sql
└── package.json
```

## API Endpoints

- GET `/tasks` - List all tasks
- GET `/tasks/new` - Show new task form
- POST `/tasks` - Create a new task
- GET `/tasks/:id` - Show task details
- POST `/tasks/:id` - Update a task
- POST `/tasks/:id/delete` - Delete a task