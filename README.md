# Student Management API

A RESTful API built using Node.js and Express.js to manage student records. This project supports Create, Read, Update, and Delete (CRUD) operations and stores data in a JSON file.

## Features

* Add a new student
* View all students
* View a student by ID
* Update student details
* Delete a student
* JSON-based data storage
* RESTful API architecture

## Technologies Used

* Node.js
* Express.js
* JavaScript
* JSON File Storage
* Git & GitHub

## Project Structure

student-management-api/

├── server.js

├── students.json

├── package.json

├── package-lock.json

└── README.md

## Installation

1. Clone the repository

git clone https://github.com/varshasiva0028/student-management-api.git

2. Navigate to the project folder

cd student-management-api

3. Install dependencies

npm install

4. Run the server

node server.js

5. Open in browser

http://localhost:3000

## API Endpoints

### Get All Students

GET /students

### Get Student By ID

GET /students/:id

### Add Student

POST /students

Request Body:

{
"id": 101,
"name": "Hamshini",
"age": 22
}

### Update Student

PUT /students/:id

### Delete Student

DELETE /students/:id

## Author

Varsha

## Future Improvements

* Input validation
* Authentication using JWT
* Database integration (MongoDB)
* Frontend interface
