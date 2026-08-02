# 🛒 SmartShop AI

SmartShop AI is a modern AI-powered e-commerce platform designed using a microservice-oriented architecture. The application combines cloud deployment, intelligent product assistance, secure authentication, analytics, and scalable backend services into a single production-style application.

The project demonstrates how modern web applications integrate Artificial Intelligence, Cloud Computing, REST APIs, Database Management, and Containerization to build an end-to-end online shopping platform.

---

# Project Highlights

- AI Assisted Shopping Experience
- AI Powered Admin Assistant
- Secure User Authentication
- Product Management
- Shopping Cart
- Checkout System
- Order Tracking
- Customer Profile Management
- Product Image Upload
- Dashboard Analytics
- Feedback System
- Cloud Deployment
- Docker Support
- REST API Architecture

---

# Technology Stack

## Frontend

- React (Vite)
- JavaScript
- HTML5
- CSS3
- Axios
- React Router

## Backend

- FastAPI
- Python
- JWT Authentication
- REST APIs
- Uvicorn

## Database

- PostgreSQL

## AI Integration

- Google Gemini API

## Cloud Services

- Azure App Service
- Azure Static Web Apps
- Azure PostgreSQL
- Azure Blob Storage

## DevOps

- Git
- GitHub
- GitHub Actions
- Docker
- Docker Compose

---

# System Architecture

```

                Users
                   │
                   ▼
      React Frontend (Vite)
                   │
             REST API Calls
                   │
                   ▼
         FastAPI Backend Server
          │        │        │
          │        │        │
          ▼        ▼        ▼
 PostgreSQL   Blob Storage  Gemini AI

```

---

# Project Structure

```

SmartShop-AI/
│
├── frontend/
│ ├── src/
│ ├── public/
│ └── package.json
│
├── backend/
│ ├── app/
│ ├── routes/
│ ├── models/
│ ├── database/
│ ├── services/
│ └── requirements.txt
│
├── docker-compose.yml
├── README.md
└── .github/

```

---

# Core Features

### Authentication

- User Registration
- Secure Login
- JWT Authentication
- Session Management

### Product Management

- Add Products
- Update Products
- Delete Products
- Product Listing
- Product Search

### Customer Features

- Shopping Cart
- Checkout
- Address Management
- Order History
- Order Tracking
- Profile Management

### Admin Features

- Dashboard
- Product Analytics
- Sales Analytics
- Order Management
- Customer Insights

### AI Features

- Customer AI Assistant
- Admin AI Assistant
- Product Recommendation Support
- Intelligent User Interaction

---

# API Modules

- Authentication APIs
- Product APIs
- Dashboard APIs
- Analytics APIs
- Order APIs
- Address APIs
- Profile APIs
- Upload APIs
- AI Assistant APIs
- Admin AI APIs

---

# Cloud Deployment

This application supports deployment using Microsoft Azure services.

Components used:

- Azure Static Web Apps
- Azure App Service
- Azure PostgreSQL
- Azure Blob Storage

---

# Local Installation

Clone the repository

```bash
git clone https://github.com/your-username/SmartShop-AI.git
```

Move into the project

```bash
cd SmartShop-AI
```

Frontend

```bash
cd frontend
npm install
npm run dev
```

Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

---

# Environment Variables

Frontend

```env
VITE_API_BASE_URL=<Backend_URL>
```

Backend

```env
DATABASE_URL=
JWT_SECRET_KEY=
GEMINI_API_KEY=
AZURE_STORAGE_CONNECTION_STRING=
AZURE_CONTAINER_NAME=
```

---

# Docker

Run using Docker Compose

```bash
docker-compose up --build
```

---

# Future Enhancements

- AI Product Recommendation Engine
- Personalized Shopping Experience
- Payment Gateway Integration
- Email Notifications
- Inventory Prediction
- Sales Forecasting
- Kubernetes Deployment
- Monitoring Dashboard

---

# License

This project is developed for educational, research, and learning purposes.

---

⭐ If you found this project useful, consider giving it a star.



# postgresql://neondb_owner:npg_fN9PLBzKcaA8@ep-young-shadow-az6gpshc-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require