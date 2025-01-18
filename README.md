
# 90-North-Assignment

## Local Setup Instructions

To set up the application locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/IronJam11/90-north-assignment.git
   ```

2. Navigate to the backend directory:
   ```bash
   cd backend
   ```

3. Install the required Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the backend directory with the following configuration:

   ```ini
   # Django Secret Key
   SECRET_KEY=<secret-key>
   
   # Debug Mode
   DEBUG=True

   # Database Configuration
   DB_NAME=<database-name(postgresql)>
   DB_USER=<database-user>
   DB_PASSWORD=<password>
   DB_HOST=127.0.0.1
   DB_PORT=5432

   # Redis Configuration
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_DB=0

   # JWT Token Configuration
   JWT_ACCESS_TOKEN_LIFETIME=180  # in minutes
   JWT_REFRESH_TOKEN_LIFETIME=1440  # in minutes (1 day)

   # Frontend URL for CORS
   FRONTEND_URL=http://localhost:5174
   ```

5. Apply migrations:
   ```bash
   python3 manage.py makemigrations
   python3 manage.py migrate
   ```

6. Start the Django development server:
   ```bash
   python3 manage.py runserver
   ```

---

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend/
   ```

2. Install the necessary frontend dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

---

## Notes

- You can register a dummy profile directly or create a user via the terminal for testing purposes.
- Ensure PostgreSQL is set up locally as specified above.
- Run the Redis Docker image to enable Redis functionality.

---

## Technology Stack

- **Backend**: Django
- **Frontend**: React + Vite
- **Databases**: Redis (for message storage), PostgreSQL (primary database)
- **Real-time Communication**: WebSockets with ASGI server running on Daphne, integrated with Django Channels.
- **Authentication**: JWT (Access and Refresh Tokens) stored as cookies in the browser.

---

## Features

- **Real-time Communication**: Implemented WebSockets to enable real-time messaging using Django Channels and the ASGI server powered by Daphne.
- **Custom User Model**: Developed a customized user model using Django's AbstractBaseUser to meet the specific needs of the application.
- **Efficient Data Storage**: Leveraged Redis, a NoSQL database, to store messages efficiently, minimizing space usage.
- **Frontend**: Built with React + Vite, styled using Tailwind CSS. Implemented all required JavaScript functions as per the problem statement.
- **Authentication**: Utilized JWT tokens for secure authentication, with smooth login and logout functionality.

---
