# 90-North

## Local Setup Instructions

To set up the application locally, follow the steps below:

### Backend Setup

1. **Clone the Repository**  
   Clone the project repository to your local machine:
   ```bash
   git clone https://github.com/IronJam11/90-north-assignment.git
   ```

2. **Navigate to the Backend Directory**  
   Change to the backend directory:
   ```bash
   cd backend
   ```

3. **Install Python Dependencies**  
   Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

4. **Make Migrations**
   Install the required Python packages:
   ```bash
   python3 manage.py makemigrations
   ```
5. **Migrate**  
   Install the required Python packages:
   ```bash
   python3 manage.py migrate
   ```
6. **Run the server locally**  
   Install the required Python packages:
   ```bash
   python3 manage.py runserver
   ```
---

### Frontend Setup

1. **Navigate to the Frontend Directory**  
   Change to the frontend directory:
   ```bash
   cd frontend/
   ```

2. **Install Frontend Dependencies**  
   Install the required Node.js packages:
   ```bash
   npm install
   ```

3. **Update Backend Hostname**  
   Update the backend hostname in the file `frontend/src/constants/hostname.jsx` to:
   ```javascript
   export const HOST_NAME = 'http://127.0.0.1:8000';
   ```

4. **Start the Frontend Development Server**  
   Launch the frontend server:
   ```bash
   npm run dev
   ```

---

## Notes

- You can register a new user profile or use the provided dummy credentials for testing:
  - **Email**: `aaryan@gmail.com`  
  - **Password**: `jain`   (exactly why dbsqlite file not included in .gitignore - for only testing purposes)

---

## Technology Stack

- **Backend**: Django with Django Channels (ASGI server powered by Daphne)
- **Frontend**: React + Vite, styled using Tailwind CSS
- **Databases**:  
  - Redis (for message storage)  
  - SQLite used in the provided codebase for deployment simplicity)
- **Real-Time Communication**: WebSockets for real-time messaging
- **Authentication**: JWT (Access and Refresh Tokens) with browser-stored cookies

---

## Features

1. **Real-Time Messaging**  
   Implemented WebSockets using Django Channels to enable real-time communication.
2. **Custom User Model**  
   Built a custom user model using Django's `AbstractBaseUser` to cater to specific application requirements.
3. **Efficient Message Storage**  
   Leveraged Redis for efficient and lightweight message storage.
4. **Frontend**  
   Developed a dynamic and responsive frontend using React + Vite, with Tailwind CSS for styling.
5. **Secure Authentication**  
   Implemented JWT-based authentication for secure login and logout processes.

---

## Deployment

- **Frontend**: Deployed on Vercel.  
  URL: [90-North Assignment Frontend](https://90-north-assignment-kappa.vercel.app/loginpage)  
- **Backend**: Deployed on PythonAnywhere.  
  URL: [Backend API](https://ironjam13.pythonanywhere.com/)  
- **WebSocket Functionality**: WebSocket support is unavailable on the free plan of PythonAnywhere, so real-time messaging features are not operational in the deployed version.


---

## AWS 

**Directory**:Check the directly AWS-lambda-code which contains the screenshots along with the code of the lambda function 


## Demo Video 

**Link**: https://drive.google.com/file/d/1K4ygDlmkWpNyKsQ29SNb9EDVrqUk2oKc/view
