# Poseidon's Notebook

A small full-stack application for recording marine species sightings. This repository contains a Node/Express backend (MySQL via Sequelize) and a Create React App frontend. The backend exposes a small REST API for authentication, species data and sightings. The frontend is a React single-page app that consumes the API and displays species and sightings, and allows logged-in users to log new sightings.

## Repository layout

- `backend/` — Express server, Sequelize models and routes.
- `frontend/` — React (Create React App) source and build output.
- `package.json` — workspace-level package file (see `backend/package.json` and `frontend/package.json`).

## Quick start (development)

Prerequisites
- Node.js 18+ (or compatible)
- MySQL server (or a MySQL add-on like JawsDB in production)

1) Install dependencies

```powershell
# from repository root
cd backend; npm install; cd ../frontend; npm install; cd ..
```

2) Configure environment variables

Create a `.env` file in `backend/` with at least the following keys (examples):

```
PORT=5000
JWT_SECRET=your_jwt_secret_here
# Either provide a full connection URL (JAWSDB_URL or DATABASE_URL) or these individual vars:
DB_NAME=poseidons_db
DB_USER=root
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=3306
```

Notes:
- If you use JawsDB (Heroku add-on) provide `JAWSDB_URL` or `DATABASE_URL` instead.
- `JWT_SECRET` is required for token signing/verification.


# Poseidon's Notebook
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=nodedotjs)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql)](https://www.mysql.com/)
[![Sequelize](https://img.shields.io/badge/Sequelize-6-52B0E7?logo=sequelize)](https://sequelize.org/)

This repository contains a small full‑stack app:
- Backend: Node, Express and Sequelize (MySQL)
- Frontend: React (Create React App)

The app allows users to register, log in, browse species, and create/edit/delete sightings.
 
<div align="center">
![Poseidon's Notebook logo](https://github.com/user-attachments/assets/d9c76bd5-468b-4837-9527-d3e68be56ea8)
</div>
---

## Table of contents

- [Key features](#key-features)
- [Tech stack](#tech-stack)
- [Repository structure](#repository-structure)
- [Quick start (development)](#quick-start-development)
- [Build & serve (production)](#build--serve-production)
- [API overview](#api-overview)
- [Database models](#database-models)
- [Image support & where to add images](#image-support--where-to-add-images)
- [Security & roles (recommended)](#security--roles-recommended)
- [Demo checklist (Stand‑Up 3)](#demo-checklist-stand-up-3)
- [Troubleshooting](#troubleshooting)
- [Next steps](#next-steps)

---

## Key features

- User registration and login (JWT)
  
  <div align="center">
  <table>
    <tr>
      <td align="center">
        <img width="280" alt="Login" src="https://github.com/user-attachments/assets/3e238a4c-53a0-4df7-9fa1-9a7a73bb302a" />
        <br><strong>Login</strong>
      </td>
      <td align="center">
        <img width="280" alt="SignUp" src="https://github.com/user-attachments/assets/a2cd9a7d-c41d-450d-b803-4e309e1bc727" />
        <br><strong>Sign Up</strong>
      </td>
    </tr>
  </table>
  </div>
- CRUD for sightings (create / read / update / delete)
- Species browsing and details (with images)
  
  <div align="center">
  <table>
    <tr>
      <td align="center">
        <img width="500" alt="SpeciesPage" src="https://github.com/user-attachments/assets/c6c4bf2a-8195-4aea-ada9-7d3f0b691687" />
        <br><strong>Browse Species</strong>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img width="400" alt="DetailPage" src="https://github.com/user-attachments/assets/0a487015-6803-44ff-b04c-5182ae2834a6" />
        <br><strong>Species Details</strong>
      </td>
    </tr>
  </table>
  </div>
- Add new species from the UI
- Search, filter, and loading states
  
  <div align="center">
  <table>
    <tr>
      <td align="center">
        <img width="600" alt="SightingsPage" src="https://github.com/user-attachments/assets/6997d109-4f61-40e0-85a8-6e71554ed500" />
        <br><strong>Sightings Dashboard</strong>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img width="400" alt="LogSighting" src="https://github.com/user-attachments/assets/de5eb2b0-47b9-4b3a-b47c-d6db885e1c15" />
        <br><strong>Log New Sighting</strong>
      </td>
    </tr>
  </table>
  </div>

  <div align="center">
    <img width="400" alt="Search Bar" src="https://github.com/user-attachments/assets/014d7bdd-51d9-453c-9def-fcd7b5392983" />
    <br><em>Real-time search functionality</em>
  </div>

---

## Tech stack

- Backend: Node.js, Express, Sequelize, MySQL, jsonwebtoken, bcryptjs
- Frontend: React, react-router, framer-motion
- Build: Create React App; backend serves the production files


---

## Repository structure

```
poseidons-notebook/
├── backend/                 # Express server (api, models, middleware)
├── frontend/                # React app
│   ├── public/              # Static files (place images here)
│   │   └── images/
│   │       └── species/
│   └── src/                 # React source (components, pages, assets)
├── package.json             # workspace scripts
└── README.md
```

---

## Quick start (development)

Prerequisites

- Node.js 18+
- MySQL server (local or cloud instance)

1) Install dependencies

```powershell
# from repository root
cd backend
npm install
cd ..\frontend
npm install
```

2) Environment configuration

Create `backend/.env` with the minimum keys:

```
PORT=5000
JWT_SECRET=your_jwt_secret
# Option A: individual DB settings
DB_NAME=poseidons_db
DB_USER=root
DB_PASSWORD=secret
DB_HOST=localhost
DB_PORT=3306
# Option B: full connection URL (e.g. JawsDB)
JAWSDB_URL=mysql://username:password@host:port/database
```

3) Start servers (two terminals)

```powershell
# Terminal 1 - backend
cd backend
npm run dev

# Terminal 2 - frontend
cd frontend
npm start
```

Visit the frontend at: `http://localhost:3000`
Backend API base: `http://localhost:5000/api`

---

## Build & serve (production)

Build the frontend and serve it from the backend (or host `frontend/build` separately):

```powershell
cd frontend
npm run build
```

The backend is configured to serve static files and map `/images` to `frontend/public/images` so image paths saved in the DB (for example `/images/species/green_turtle.jpg`) will resolve.

---

## API overview

All API routes are prefixed with `/api` on the server.

Authentication

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login (returns JWT) |

Species

| Method | Endpoint | Auth |
| ------ | -------- | ---- |
| GET | /api/species | No |
| GET | /api/species/:id | No |
| POST | /api/species | Yes (admin recommended) |

Sightings

| Method | Endpoint | Auth |
| ------ | -------- | ---- |
| GET | /api/sightings | No (public listing) |
| POST | /api/sightings | Yes |
| PUT | /api/sightings/:id | Yes (owner or admin) |
| DELETE | /api/sightings/:id | Yes (owner or admin) |

Check the `routes/` folder for request/response details and validation.

---

## Database models (summary)

User

```json
{
  "user_id": "integer (PK)",
  "username": "string",
  "email": "string",
  "password": "string (hashed)",
  "role": "string (optional: 'user'|'admin')"
}
```

Species

```json
{
  "species_id": "integer (PK)",
  "common_name": "string",
  "scientific_name": "string",
  "category": "string",
  "conservation_status": "string",
  "image_url": "string (e.g. /images/species/green_turtle.jpg)",
  "description": "text"
}
```

Sighting

```json
{
  "sighting_id": "integer (PK)",
  "user_id": "integer (FK -> User)",
  "species_id": "integer (FK -> Species)",
  "sighting_date": "date",
  "location": "string",
  "depth_meters": "float",
  "notes": "text"
}
```

---

## Image support & where to add images

Images must live in the frontend public folder so they are available at predictable URLs.

- Add UI images to: `frontend/public/images/`
- Add species photos to: `frontend/public/images/species/`

Runtime image path stored in DB should be: `/images/species/<filename>`

Example placeholders to add now:

- `frontend/public/images/logo.png` — site logo
- `frontend/public/images/heroImage.gif` — landing hero image
- `frontend/public/images/icons/*` — social icons
- `frontend/public/images/species/species_placeholder.jpg` — fallback

PowerShell quick setup (from repo root):

```powershell
New-Item -ItemType Directory -Force -Path "frontend/public/images/species"
New-Item -ItemType Directory -Force -Path "frontend/public/images/icons"
Copy-Item -Path "frontend/src/assets/logo.png" -Destination "frontend/public/images/logo.png" -ErrorAction SilentlyContinue
```

Frontend helper (already present in the repo) converts stored paths directly to URLs; if you store `/images/species/green_turtle.jpg` in the DB the frontend will request that path and the backend static mapping will serve the file.

Example React usage (component snippet):

```jsx
// components/SpeciesCard.jsx
import React from 'react';
import { getImageUrl } from '../api';

export default function SpeciesCard({ species }) {
  const src = species.image_url || '/images/species/species_placeholder.jpg';
  return (
    <div className="species-card">
      <img
        src={getImageUrl(src)}
        alt={species.common_name || 'Species image'}
        loading="lazy"
        onError={(e) => { e.currentTarget.src = '/images/species/species_placeholder.jpg'; }}
      />
      <h3>{species.common_name}</h3>
      <p><em>{species.scientific_name}</em></p>
    </div>
  );
}
```

---

## Security & roles (recommended)

- Add `role` to the User model for admin functionality (`user` | `admin`).
- Include `role` in the JWT payload when issuing tokens.
- Protect admin routes with middleware that checks `req.user.role`.

Example admin middleware:

```javascript
function authorizeAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
}
```

Ensure ownership checks when updating/deleting sightings:

```javascript
if (req.user.id !== sighting.user_id && req.user.role !== 'admin') {
  return res.status(403).json({ error: 'Access denied' });
}
```

---

## Demo checklist (Stand‑Up 3)

When you demo, cover these items:

1. Show the feature list you completed after Stand‑Up 2.
2. Register and log in a user; inspect JWT in localStorage.
3. Create a species (if admin) and create a sighting that references it.
4. Edit a sighting and show the update persisted.
5. Delete a sighting and confirm removal.
6. Show species images loading from `/images/species/...` and the placeholder fallback.
7. Show a few meaningful git commits and branch state on GitHub.

---

## Troubleshooting

- Images 404: check that `frontend/public/images/species/<file>` exists and the image path in DB starts with `/images/`.
- Auth 401/403: verify `JWT_SECRET` is set and frontend sends `Authorization: Bearer <token>`.
- DB errors: check `backend/.env` DB credentials and that MySQL is running.
- If `npm run dev` fails, run `node server.js` in `backend` to see raw errors.

---

## Next steps (suggested)

- Add server-side validation (express-validator).
- Add role-based admin UI for species management.
- Add tests for API endpoints.
- Optimize images (WebP) and add responsive image sizes.

---

If you want, I can: copy a set of placeholder images from `frontend/src/assets` into `frontend/public/images/` for you, or add a short Stand‑Up 3 summary paragraph. Tell me which and I'll do it.

