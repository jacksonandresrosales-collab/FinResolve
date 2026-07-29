# FinResolve

Full-stack web application built with **React** (Frontend), **Java Spring Boot** (Backend), and **MySQL** (Database).

## 📁 Project Structure

```
FinResolve/
├── frontend/              # React + Vite frontend
│   ├── src/
│   │   ├── assets/        # Static assets (images, fonts)
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page-level components
│   │   ├── services/      # API client & service layer
│   │   ├── App.jsx        # Root component
│   │   └── main.jsx       # Entry point
│   ├── package.json
│   └── vite.config.js
│
├── backend/               # Java Spring Boot API
│   ├── src/main/java/com/finresolve/
│   │   ├── config/        # Configuration (CORS, Security)
│   │   ├── controller/    # REST controllers
│   │   ├── dto/           # Data Transfer Objects
│   │   ├── exception/     # Custom exceptions & handlers
│   │   ├── model/         # JPA entities
│   │   ├── repository/    # Data access layer
│   │   ├── service/       # Business logic
│   │   └── FinResolveApplication.java
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
├── database/              # MySQL scripts
│   ├── init.sql           # Database creation & schema
│   └── seed.sql           # Initial data
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- **Java 17+** (JDK)
- **Node.js 18+** & npm
- **MySQL 8.0+**
- **Maven 3.9+**

### Database Setup
1. Start your MySQL server
2. Run the initialization script:
   ```bash
   mysql -u root -p < database/init.sql
   ```
3. Update `backend/src/main/resources/application.properties` with your MySQL credentials.

### Backend (Spring Boot)
```bash
cd backend
mvn spring-boot:run
```
The API will be available at `http://localhost:8080/api`

### Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
The app will be available at `http://localhost:5173`

## 🔗 API Communication

The frontend communicates with the backend via REST API calls. The API client is configured in `frontend/src/services/apiClient.js`.

- **Base URL**: `http://localhost:8080/api`
- **Health Check**: `GET /api/public/health`

## 🛠 Tech Stack

| Layer     | Technology        |
|-----------|-------------------|
| Frontend  | React + Vite      |
| Backend   | Java Spring Boot  |
| Database  | MySQL             |
| ORM       | Hibernate / JPA   |
| Security  | Spring Security   |
| Build     | Maven + npm       |
