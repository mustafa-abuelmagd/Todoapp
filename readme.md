# Todo App

This is a simple todo app built with Express.js for the API (backend), Prisma.js for the ORM, and MongoDB for the database.

## Getting Started

### Prerequisites
- Node.js (v14 or above)
- MongoDB
- Docker and Docker Compose

### Installation

Clone the repository:
git clone git@github.com:mustafa-abuelmagd/Todoapp.git



Install the required modules:
```
npm install
```

Build the Docker image defined in the `docker-compose.yml` file:
```
docker-compose build
```

### Starting the Backend

To start the backend project, run the following command:
npm run start


The backend server will start running on the specified port, and you can access the API endpoints.

## API Endpoints

The following API endpoints are available:
### Todos
- `GET /todos`: Retrieve all todos.
- `POST /todos`: Create a new todo.
- `PUT /todos/:id`: Update a todo by ID(you can only update the "is_done" field on a todo).
- `DELETE /todos/:id`: Delete a todo by ID.

### Users
- `POST /users/login`: Login to the application.
- `POST /users/signup`: sign up with a new account.

Refer to the API documentation or code for more details about the request and response formats.

## Technologies Used

- Express.js: Fast and minimalist web application framework for Node.js.
- Prisma.js: Modern database toolkit and ORM for Node.js and TypeScript.
- MongoDB: NoSQL document database for storing todo data.

## Contributing

Contributions to this project are welcome. Feel free to open issues and submit pull requests.

## License

This project is licensed under the MIT License.

## Acknowledgements

Special thanks to the contributors and developers who have made this project possible.
