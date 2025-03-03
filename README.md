
# Simple Login & Signup App

A simple full-stack web app for user login and signup, built with React (Vite) and Spring Boot, using MongoDB Atlas for storage.

---

## Features

- Sign up with username, email, and password.
- Log in and see a welcome home page.
- Logout functionality.
- Data stored in MongoDB Atlas.

---

## Tech Stack

- **Frontend**: React, Vite, Axios, React Router
- **Backend**: Spring Boot, Spring Data JPA
- **Database**: MongoDB Atlas.

---

## Setup

### Prerequisites
- Java 17+
- Node.js 18+
- Maven
- npm

### 1. Clone the Repo
```bash
git clone https://github.com/Gaurav-Shaw09/login-signup-app.git
cd login-signup-app
```

### 2. Set Up MongoDB Atlas
spring.application.name=demo

## Mongo  Configuration
```bash
spring.data.mongodb.uri=mongodb+srv://admin:<db_password>@cluster0.anqim.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
spring.data.mongodb.database=login_db
spring.data.mongodb.auto-index-creation=true
```
### 3. Run Backend
```bash
cd spring-login-backend
mvn spring-boot:run
```

### 4. Run Frontend
```bash
cd react-login-frontend
npm install
npm run dev
```

### 5. Open App
Go to `http://localhost:5173` in your browser.

---

## API Endpoints

- **POST** `/api/auth/register` - `{username, password, email}`
- **POST** `/api/auth/login` - `{username, password}`

---

## Project Structure

```
login-signup-app/
├── spring-login-backend/  # Backend
└── react-login-frontend/  # Frontend
```

---
