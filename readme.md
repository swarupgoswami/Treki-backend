Treki - Backend API

This is the backend service for Treki, an API Request Manager tool. It is built using Node.js, Express, and Prisma (ORM) with a PostgreSQL database. This backend powers both the web frontend and the CLI by providing authentication and request handling APIs.
🚀 Features

    User registration and login

    JWT-based authentication

    Send and store API requests

    Manage and retrieve saved requests

    Keep a complete request history

    Built with Express and Prisma

    PostgreSQL support

🛠 Tech Stack

    Node.js with Express

    Prisma ORM

    PostgreSQL (NeonDB recommended for cloud)

    JWT for authentication

    dotenv for environment variables

🔧 Installation
1. Clone the repository

git clone https://github.com/swarupgoswami/Treki-backend.git
cd Treki-backend

2. Install dependencies

npm install

3. Configure environment variables
Create a .env file in the root directory:

DATABASE_URL="your_postgres_connection_url"

Create a .env file inside the backend/ folder:

PORT=5000
JWT_SECRET="your_super_secret_key"

4. Generate Prisma client

Run this from the root:

npx prisma generate

5. Run the development server

node backend/app.js

Your backend is now running at:
http://localhost:5000
📚 API Endpoints
🔐 Auth Routes
POST /api/auth/register

Register a new user.

    Request Body:

{
  "username": "your_username",
  "email": "you@example.com",
  "password": "your_password"
}

    Response:

{
  "message": "User registered",
  "user": {
    "id": 1,
    "username": "your_username",
    "email": "you@example.com"
  }
}

POST /api/auth/login

Login an existing user.

    Request Body:

{
  "email": "you@example.com",
  "password": "your_password"
}

    Response:

{
  "message": "Login successful",
  "token": "jwt_token_here"
}

📬 Request Routes
POST /api/requests/send

Send a new request and store it.

    Request Body:

{
  "method": "GET",
  "url": "https://jsonplaceholder.typicode.com/posts",
  "headers": { "Content-Type": "application/json" },
  "body": null
}

    Response:

{
  "response": {
    "...": "..."
  }
}

GET /api/requests/

Get all stored requests for the logged-in user.

    Response:

[
  { "...": "..." }
]

GET /api/requests/:id

Fetch a single request by ID.

    Response:

{
  "...": "..."
}

PUT /api/requests/:id

Update a stored request.

    Request Body:

{
  "url": "https://api.new.com",
  "method": "POST"
}

    Response:

{
  "...": "..."
}

DELETE /api/requests/:id

Delete a stored request.

    Response:

{
  "message": "Request deleted"
}

GET /api/requests/history

Get the entire request history.

    Response:

[
  { "...": "..." }
]

🧩 Database Models
🧑 User Model

Field	Type	Properties
id	Integer	Primary Key, Auto-increment
username	String	Unique
email	String	Unique
password	String	Encrypted
createdAt	DateTime	Default: now()
updatedAt	DateTime	Auto-updated
📜 History Model

Field	Type	Properties
id	Integer	Primary Key, Auto-increment
method	String	e.g., GET, POST, etc.
url	String	
headers	JSON	Optional
body	JSON	Optional
status	Integer	Optional
response	JSON	Optional
time	String	e.g., "234ms"
createdAt	DateTime	Default: now()
updatedAt	DateTime	Auto-updated