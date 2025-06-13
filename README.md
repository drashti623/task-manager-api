## ask Manager API
A simple RESTful API built with Node.js and Express.js to manage tasks.
This project demonstrates backend concepts like routing, middleware, JSON handling, and CRUD operations via REST API.

## Project Structure
.
├── Main.html
├── Server.js
├── package.json
├── package-lock.json

## Technologies Used
Node.js

Express.js

Postman (for testing APIs)

## Features
Add new tasks with a title, description, and status

View all available tasks

Update the status of a task

Delete a task using its ID

JSON handling and route management using Express

Middleware integration for request parsing

## Task Object Format
Each task follows this JSON format:

{id: 1,
title: "Complete DSA Assignment",
description: "Finish and submit the assignment before 10 PM",
status: "pending"}

## API Endpoints
POST /tasks – Create a new task
GET /tasks – Retrieve all tasks
PUT /tasks/:id – Update task status by ID
DELETE /tasks/:id – Delete a task by ID

## Testing with Postman
Run the server:
node Server.js

Use the following endpoints in Postman:

POST /tasks
Body (raw JSON):
{
"title": "Learn Express",
"description": "Study middleware and routing",
"status": "pending"
}

GET /tasks
Retrieves a list of all tasks.

PUT /tasks/:id
Body (raw JSON):
{
"status": "completed"
}

DELETE /tasks/:id
Deletes the task with the given ID.

## Frontend (Optional)
The file Main.html is included for building a basic frontend using HTML + JavaScript to interact with the API (e.g., using fetch()).

## Installation & Setup
Clone the repository or download the files.

Install dependencies:
npm install

Start the server:
node Server.js

The server will run on:
http://localhost:3000 (or whichever port is configured)

## Author
Drashti Govani
✨ Always building, always learning ✨

## License
This project is created for educational purposes.
Feel free to modify and experiment with it for your personal learning.

## Support
If this helped you or you love clean backend setups,
smile, hydrate, and keep building babe 👑🚀

