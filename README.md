# Finni Health - Patient Management Dashboard

A full-stack web application for healthcare providers to efficiently manage patient data.

## Project Overview

This application allows healthcare providers to:
- Input patient data (name, DOB, status, address)
- View patient data in a clean, intuitive interface
- Edit and delete patient records

## Tech Stack

### Frontend
- React.js
- Material UI for component library
- React Router for navigation
- React Hook Form for form handling

### Backend
- Node.js with Express
- MongoDB for data persistence
- Mongoose ODM for data modeling

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- MongoDB (local installation or MongoDB Atlas account)

### Installation

1. Clone the repository
```
git clone <repository-url>
cd finni-health-assessment
```

2. Install dependencies for both server and client
```
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Set up environment variables
   - Create a `.env` file in the server directory if it doesn't exist
   - Configure MongoDB connection string and other environment variables

### Running the Application

#### Development Mode

1. Start the server
```
cd server
npm run dev
```

2. In a separate terminal, start the client
```
cd client
npm start
```

3. Access the application at `http://localhost:3000`

#### Production Mode

1. Build the client
```
cd client
npm run build
```

2. Start the server
```
cd server
npm start
```

## Features

- **Patient Management**:
  - Create, read, update, and delete patient records
  - Input validation for all fields
  - Responsive design for all screen sizes

- **Data Fields**:
  - Names (First, Middle, Last)
  - Date of Birth
  - Status (Inquiry, Onboarding, Active, Churned)
  - Address (Street, City, State, ZIP Code)

## Project Structure

```
finni-health-assessment/
├── client/                 # React frontend
│   ├── public/             # Static files
│   └── src/                # Source files
│       ├── components/     # Reusable components
│       ├── pages/          # Page components
│       ├── services/       # API services
│       └── utils/          # Utility functions
├── server/                 # Node.js backend
│   ├── controllers/        # Request handlers
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   └── config/             # Configuration files
├── .gitignore              # Git ignore file
├── Makefile                # Project management commands
├── README.md               # Project documentation
└── Requirement.md          # Project requirements
```

## API Endpoints

- `GET /api/patients` - Get all patients
- `GET /api/patients/:id` - Get a specific patient
- `POST /api/patients` - Create a new patient
- `PUT /api/patients/:id` - Update a patient
- `DELETE /api/patients/:id` - Delete a patient
