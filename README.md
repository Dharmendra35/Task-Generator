# Task Generator - Mini Planning Tool

A full-stack web application that generates user stories and engineering tasks based on project specifications. Users can create, edit, reorder, and export project plans.

## Features

- 🔐 User authentication with JWT and bcrypt
- 📝 Fill a form with project details (goal, target users, constraints, type, risks)
- 🤖 Generate user stories and tasks automatically (rule-based)
- 🎯 View tasks grouped by category (Frontend, Backend, Database)
- 🔄 Drag-and-drop to reorder tasks
- ✏️ Edit and delete tasks
- 📋 Export as Markdown or copy to clipboard
- 📚 View last 5 generated specs

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB Atlas** for database
- **JWT** for authentication
- **bcryptjs** for password hashing
- **dotenv** for environment variables
- **CORS** enabled for frontend communication

### Frontend
- **React** with Vite
- **Axios** for API calls
- **Tailwind CSS** for styling
- **react-beautiful-dnd** for drag-and-drop
- **React Router** for navigation

## Project Structure

```
Task-Generator/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── routes/          # API routes
│   │   ├── models/          # MongoDB schemas
│   │   ├── middlewares/     # Express middlewares
│   │   ├── utils/           # Helper functions
│   │   ├── db/              # Database connection
│   │   └── index.js         # Server entry point
│   ├── .env                 # Environment variables
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account
- npm or yarn

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with:
```
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/task-generator?retryWrites=true&w=majority
```

4. Start the server:
```bash
npm run dev
```

Server runs on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

Frontend runs on `http://localhost:3000`


## Generation Rules

### Web Projects
- Authentication system
- REST API endpoints
- Database schema
- Login/signup UI
- Dashboard component
- API integration

### Mobile Projects
- Mobile authentication
- API endpoints
- Database schema
- Responsive UI
- Mobile auth flow
- API integration

### Internal Tools
- Basic authentication
- API endpoints
- Database schema
- User interface
- Core features

All projects generate at least 3 user stories and tasks grouped by category.

## Usage

### Authentication Flow

1. **Register:**
   - Click "Sign Up" on the auth page
   - Enter name, email, password
   - Account is created and you're logged in

2. **Login:**
   - Enter email and password
   - JWT token is stored in localStorage
   - Token is automatically sent with all API requests

3. **Logout:**
   - Click "Logout" button in the top right
   - Token and user data are cleared from localStorage

### Create a Spec:
   - Fill the form on the home page
   - Click "Generate Spec"
   - View generated user stories and tasks

### Edit Tasks:
   - Drag tasks to reorder them
   - Click ✕ to delete a task

### Export:
   - Click "Copy to Clipboard" to copy Markdown
   - Click "Download as MD" to download as file

### View Recent:
   - Click on a recent spec to view it again
   - Click ✕ to delete a spec

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/task-generator?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here_change_in_production
```

## Development

### Running Both Servers

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

### Building for Production

Backend:
```bash
npm start
```

Frontend:
```bash
npm run build
npm run preview
```

## Future Enhancements

- AI-powered task generation
- User authentication
- Team collaboration
- Task templates
- Custom task categories
- Integration with project management tools

## Devleloper
Dharmendra Kumar