# Poseidon's Notebook: Marine Species Logbook

<div align="center">

![Poseidon's Notebook Banner](https://github.com/user-attachments/assets/6daab944-d099-43c9-b089-72093f9b5c09)

**A full-stack web application designed for marine enthusiasts, scientists, and conservationists to record and track marine species sightings.**

[Live Deployment](https://www.poseidonsnotebook.co.za) • [Demo Video](https://drive.google.com/file/d/15sTHJiWWi6rH_ealmAPxvuHYY0edXPjx/view?usp=sharing) • [Report Issues](https://github.com/corbyn-jpg/poseidons-notebook/issues)

![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.x-4479A1?logo=mysql&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

</div>

---

## Table of Contents

- [About The Project](#about-the-project)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Features](#project-features)
- [Development Process](#development-process)
- [Final Outcome](#final-outcome)
- [Conclusion](#conclusion)
- [License](#license)
- [Author](#author)
- [Acknowledgements](#acknowledgements)

---

## About The Project

**Poseidon's Notebook** is a comprehensive marine species tracking platform that bridges the gap between scientific data collection and public engagement with marine conservation. This digital field journal provides a secure platform where users can log their marine sightings, browse an extensive species database, and contribute to marine conservation awareness.

### Key Outcomes

- Provides an intuitive platform for marine life documentation
- Enables real-time species data access for field researchers
- Supports conservation efforts through public engagement
- Demonstrates full-stack development with secure authentication

**Type:** Full-Stack Web Application (Mobile-Friendly)  
**Developer:** Chloe Robinson  
**Live URL:** [www.poseidonsnotebook.co.za](https://www.poseidonsnotebook.co.za)

---

## Built With

### Frontend
- **[React](https://reactjs.org/)** - Component-based UI framework
- **[React Router](https://reactrouter.com/)** - Single Page Application navigation
- **[Framer Motion](https://www.framer.com/motion/)** - Smooth animations and transitions
- **CSS3** - Responsive design with Flexbox/Grid

### Backend
- **[Node.js](https://nodejs.org/)** - Runtime environment
- **[Express.js](https://expressjs.com/)** - REST API server framework
- **[Sequelize](https://sequelizejs.com/)** - MySQL ORM for database management
- **[JWT](https://jwt.io/)** - Secure authentication tokens
- **[bcryptjs](https://github.com/dcodeIO/bcrypt.js)** - Password hashing and security

### Database & Deployment
- **[MySQL](https://www.mysql.com/)** - Relational database management
- **[AWS](https://aws.amazon.com/)** - Cloud deployment and hosting

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (v9 or higher) - Comes with Node.js
- **MySQL Server** (local or cloud instance) - [Download](https://www.mysql.com/downloads/)
- Modern web browser with JavaScript enabled

### Installation

Follow these steps to set up the project locally:

#### 1. Clone and Setup

```bash
git clone https://github.com/corbyn-jpg/poseidons-notebook.git
cd poseidons-notebook/backend
npm install
```

#### 2. Configure Environment Variables

Create a `backend/.env` file with the following configuration:

```env
PORT=5000
JWT_SECRET=your_secure_jwt_secret_here
DB_NAME=poseidons_notebook
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
DB_PORT=3306
NODE_ENV=development
```

#### 3. Database Setup

```bash
# Create database in MySQL
CREATE DATABASE poseidons_notebook;

# Run migrations (if using Sequelize migrations)
npx sequelize-cli db:migrate

# Seed initial data (species, admin user)
npx sequelize-cli db:seed:all
```

#### 4. Setup Frontend

```bash
cd ../frontend
npm install
```

#### 5. Launch the Application

Open two terminal windows:

```bash
# Terminal 1 - Backend server
cd backend
npm run dev

# Terminal 2 - Frontend development server
cd frontend
npm start
```

#### 6. Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

---

## Project Features

### Authentication & Security

- User registration and login with JWT-based sessions
- Password encryption using bcryptjs
- Role-based access control (User/Admin)
- Secure token validation and refresh mechanisms

<div align="center">
<table>
  <tr>
    <td align="center">
      <img width="647" alt="Login" src="https://github.com/user-attachments/assets/3e238a4c-53a0-4df7-9fa1-9a7a73bb302a" />
      <br><strong>Login</strong>
    </td>
    <td align="center">
      <img width="504" alt="SignUp" src="https://github.com/user-attachments/assets/a2cd9a7d-c41d-450d-b803-4e309e1bc727" />
      <br><strong>Sign Up</strong>
    </td>
  </tr>
</table>
</div>

### Species & Sightings Management

- **Browse Marine Species:** Comprehensive database with conservation status
- **Log Sightings:** Create personal observation records with location and notes
- **CRUD Operations:** Full Create, Read, Update, Delete functionality for user data
- **Search & Filter:** Find species by name, type, or conservation status

<div align="center">
<table>
  <tr>
    <td align="center">
      <img width="1768" alt="SpeciesPage" src="https://github.com/user-attachments/assets/c6c4bf2a-8195-4aea-ada9-7d3f0b691687" />
      <br><strong>Browse Species</strong>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img width="929" alt="DetailPage" src="https://github.com/user-attachments/assets/0a487015-6803-44ff-b04c-5182ae2834a6" />
      <br><strong>Species Details</strong>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img width="835" alt="AddSpecies" src="https://github.com/user-attachments/assets/01d70d0e-80c0-466e-8478-aa89e237de4a" />
      <br><strong>Add New Species</strong>
    </td>
  </tr>
</table>
</div>

### Sightings Dashboard

- Track and manage all your marine observations
- Create, edit, and delete sighting records
- View detailed information about each sighting
- Filter and search through your sighting history

<div align="center">
<table>
  <tr>
    <td align="center">
      <img width="1289" alt="SightingsPage" src="https://github.com/user-attachments/assets/6997d109-4f61-40e0-85a8-6e71554ed500" />
      <br><strong>Sightings Dashboard</strong>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img width="946" alt="LogSighting" src="https://github.com/user-attachments/assets/de5eb2b0-47b9-4b3a-b47c-d6db885e1c15" />
      <br><strong>Log New Sighting</strong>
    </td>
  </tr>
</table>
</div>

### Search & Filter Capabilities

- Real-time search functionality across species and sightings
- Advanced filtering by conservation status, category, and more
- Instant results as you type

<div align="center">
  <img width="601" alt="Search Bar" src="https://github.com/user-attachments/assets/014d7bdd-51d9-453c-9def-fcd7b5392983" />
  <br><em>Real-time search functionality</em>
</div>

### Administrative Features

- Add new species to the global database
- Manage user accounts and permissions
- Moderate content and ensure data quality
- View platform analytics and user activity

### User Experience

- **Responsive Design:** Optimized for desktop, tablet, and mobile field use
- **Intuitive Navigation:** Clean, ocean-inspired interface
- **Real-time Feedback:** Immediate validation and user guidance
- **Accessibility:** WCAG-compliant design patterns

---

## Development Process

### System Architecture

The application follows a modern three-tier architecture:

```
Frontend (React) ↔ Backend API (Express) ↔ Database (MySQL)
```

**Frontend Structure:**
- Component-based architecture for reusability
- Client-side routing with React Router
- Centralized state management with React Context
- Responsive CSS with mobile-first approach

**Backend Structure:**
- RESTful API design with clear endpoint separation
- Middleware-based authentication and authorization
- Database abstraction with Sequelize ORM
- Error handling and validation layers

### Database Design

**Entity Relationship Diagram:**

```sql
Users (id, email, password_hash, role, created_at)
Species (id, common_name, scientific_name, description, conservation_status, image_url)
Sightings (id, user_id, species_id, date_observed, location, notes, images)
```

### Authentication Flow

```javascript
// JWT Middleware Implementation
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// Admin Authorization Middleware
const authorizeAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin privileges required' });
  }
  next();
};
```

### Visual Design & Planning

**Color Palette:**
- **Primary:** Ocean Blues (#1261A4, #1E88E5)
- **Secondary:** Marine Teals (#5CIA6B)
- **Accent:** Coral (#E57373)
- **Neutral:** Sand & Deep Navy

**Typography:**
- **Headings:** Playfair Display (elegance, readability)
- **Body:** Inter (clarity, modern feel)

**Wireframes & Prototyping:**
- Comprehensive Figma designs for all user flows
- Mobile-first responsive breakpoints
- User journey mapping for field researchers

---

## Final Outcome

### Live Demonstration

**[View Demo Video](https://github.com/user-attachments/assets/6daab944-d099-43c9-b089-72093f9b5c09)** - 5-minute walkthrough of key features and user journey

### Deployed Application

**[www.poseidonsnotebook.co.za](https://www.poseidonsnotebook.co.za)** - Live production deployment

### Key Screenshots

**Dashboard View**
![Dashboard]<img width="1881" height="894" alt="image" src="https://github.com/user-attachments/assets/9f49179e-0cfb-4049-a177-50922fb7e017" />

**Mobile Interface**
![Mobile View]<img width="489" height="903" alt="image" src="https://github.com/user-attachments/assets/c78545e5-b639-465c-9fb6-95255cc9f0d4" />


---

## Conclusion

### Project Highlights

✅ Successfully deployed my first full-stack application to a public domain  
✅ Implemented secure authentication with JWT and role-based permissions  
✅ Created a responsive, mobile-friendly interface suitable for field use  
✅ Designed and implemented a normalized database schema with proper relationships  
✅ Established a maintainable codebase with clear separation of concerns

### Technical Challenges & Solutions

**Database Relationships:** Initially struggled with Sequelize associations, resolved through thorough documentation study and testing

**JWT Implementation:** Debugged token expiration and refresh logic to ensure seamless user sessions

**Image Management:** Developed solutions for handling species images across different environments

**Deployment Coordination:** Managed the complexity of deploying both frontend and backend services

### Lessons Learned

1. **Importance of Planning:** Comprehensive wireframing and database design saved significant development time
2. **Security First:** Implementing authentication early prevented costly refactoring later
3. **User Experience:** Mobile responsiveness is crucial for field-based applications
4. **Documentation:** Maintaining clear README files and code comments improves collaboration and maintenance

### Future Improvements

🔮 **Planned Features:**

- **Mobile Application:** Native iOS/Android versions for offline field use
- **AI Integration:** Automated species identification from uploaded photos
- **Interactive Mapping:** Geographic visualization of sighting locations
- **Advanced Analytics:** Conservation insights and population trend analysis
- **Community Features:** User profiles, following systems, and data sharing options

---

## 📄 License

This project is licensed under the **MIT License**. This means you are free to use, modify, and distribute this software, subject to the terms of the license. 

**Note:** This license applies only to the codebase - all rights to the project concept, branding, and deployed instance are reserved by the author.

Copyright © 2025 Chloe Robinson. All rights reserved.

---

## 👤 Author

**Chloe Robinson**  
*Full-Stack Developer & Marine Conservation Enthusiast*

- 📧 **Email:** 241040@virtualwindow.co.za
- 💼 **LinkedIn:** [linkedin.com/in/chloe-robinson-25b123351](https://www.linkedin.com/in/chloe-robinson-25b123351)
- 🐙 **GitHub:** [github.com/corbyn-jpg](https://github.com/corbyn-jpg)
- 🌐 **Portfolio:** [Your Portfolio Link]

---

## 🙏 Acknowledgements

This project was made possible through the support and resources of several individuals and organizations:

### Educational Resources

- **[Open Window Institute](https://openwindow.co.za/)** - DV200 Course curriculum and instruction
- **[MDN Web Docs](https://developer.mozilla.org/)** - Comprehensive web development references
- **[Sequelize Documentation](https://sequelize.org/)** - Database ORM guidance and best practices
- **[React Official Documentation](https://reactjs.org/)** - Component lifecycle and hooks reference

### Tools & Technologies

- **[Figma](https://www.figma.com/)** - Wireframing and UI/UX design platform
- **[AWS](https://aws.amazon.com/)** - Cloud infrastructure and deployment services
- **[MySQL Workbench](https://www.mysql.com/products/workbench/)** - Database design and management
- **[Postman](https://www.postman.com/)** - API testing and development

### Support & Inspiration

- **Course Instructors** - Technical guidance and project feedback
- **[OpenAI](https://openai.com/)** - Coding assistance and problem-solving support
- **Marine Conservation Community** - Inspiration for application purpose and features
- **Peer Developers** - Code reviews and collaborative learning

### Special Thanks

To the marine research community for inspiring a tool that bridges technology and conservation, and to all open-source contributors whose work makes projects like this possible.

---

<div align="center">

**⭐ If you found this project helpful, please consider giving it a star!**

Made with 💙 for the ocean

</div>


