# Poseidon's Notebook

A full-stack app for recording marine species sightings. This repo is split into a Node/Express backend (MySQL, Sequelize) and a React frontend. The app focuses on usability for logging, browsing, and tracking species as personally sighted by registered users.

---

## Table of Contents
- [About The Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Features](#project-features)
- [Development Process](#development-process)
- [Final Outcome](#final-outcome)
- [Conclusion](#conclusion)
- [Footer](#footer)

---

## About The Project

**Description:**  
Poseidon's Notebook makes marine biology approachable, letting anyone keep a personal, digital logbook for aquatic species. It enables secure logins, CRUD operations for sightings, and explores simple, clean UI focused on real-world field use.

![App Demo](https://github.com/user-attachments/assets/6daab944-d099-43c9-b089-72093f9b5c09)

---

## Tech Stack
- **Backend:** Node.js 18+, Express, Sequelize, MySQL, JWT
- **Frontend:** React (CRA), react-router, Framer Motion
- **Misc:** bcryptjs (authentication), dotenv, REST API design

---

## Getting Started

**Prerequisites**
- Node.js 18+
- npm 9+
- MySQL server

**Installation Steps**
1. Clone the repository and install dependencies for both backend and frontend:
    ```sh
    cd backend
    npm install
    cd ../frontend
    npm install
    cd ..
    ```
2. Create a file `backend/.env` with:
    ```sh
    PORT=5000
    JWT_SECRET=choose-a-strong-secret
    DB_NAME=poseidons_db
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_HOST=localhost
    DB_PORT=3306
    # Or provide a JAWSDB_URL or DATABASE_URL if using a hosted database.
    ```

3. Start the servers:

    - Terminal 1:  
      ```
      cd backend
      npm run dev
      ```
    - Terminal 2:  
      ```
      cd frontend
      npm start
      ```

- App accessible at [http://localhost:3000](http://localhost:3000)

---

## Project Features

- User registration/login (JWT-based)
- CRUD: Create, read, update, delete your sightings
- Species database with image support
- Add new species (admin)
- Search, filter by species or notes
- Responsive UI for mobile/desktop

![Login](https://github.com/user-attachments/assets/3e238a4c-53a0-4df7-9fa1-9a7a73bb302a)
![Species Browser](https://github.com/user-attachments/assets/c6c4bf2a-8195-4aea-ada9-7d3f0b691687)

---

## Development Process

- **Architecture**: SPA using classic React for fluid navigation. API-first design for flexibility.
- **Authentication**: Secure JWT with user roles.
- **Visual Planning**: Figma wireframes, blue/teal oceanic palette.
- **Key Code Example**: Admin route guard (Express middleware):

    ```js
    function authorizeAdmin(req, res, next) {
      if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
      }
      next();
    }
    ```

- **Database Models**:  
    - Users: ID, email, password (hashed), role
    - Species: ID, common/scientific name, image, status
    - Sightings: ID, userID, speciesID, date, location, notes

---

## Final Outcome

- **Demo Video:** [View on YouTube](#)
- **(Optional) Deployed Link:** [Live Site](#)
- **Screenshots:** (see above)

---

## Conclusion

**Highlights:**  
- Built a full-stack CRUD app with secure authentication and persistent storage.
- Practiced deployment prep, state management, and image handling.

**Challenges:**  
- Tuning Sequelize for SQL joins; image path resolution in both dev/prod.

**Improvements:**  
- Add role-based dashboards; cloud image uploads; improved search experience.

---

## Footer

**License:** MIT  
**Author:** Corbyn JPG (corbyn-jpg on GitHub)  
**Contact:**  
Email: your.email@example.com  
LinkedIn: [your-profile](#)

**Acknowledgements:**  
- MDN Web Docs, Sequelize docs, OpenAI for coding help, Figma
