# Poseidon's Notebook

A full-stack CRUD web app to record, browse and track marine species sightings.
## Table of contents

- [Key features](#key-features)
- [Tech stack](#tech-stack)
## Key features

- 🔐 User authentication (register / login)
- 📝 Full CRUD for sightings (create, read, update, delete)
## Tech stack

**Backend**

## Repository structure

```
poseidons-notebook/
## Quick start (development)

### Prerequisites

- Node.js v18+ installed
- MySQL server (local or cloud)
### Environment

Create a `.env` file in `backend/` with at least:

### Start the apps

```powershell
# Terminal 1 - Backend
cd backend
## Build & serve (production)

1. Build the frontend:

## API overview

Base URL: `/api`

## Database models

### User

```json
{
  "user_id": "PrimaryKey",
  "username": "String",
  "email": "String",
  "password": "String (hashed)",
  "role": "String (recommended: 'user'|'admin')"
}
```

### Species

```json
{
  "species_id": "PrimaryKey",
  "common_name": "String",
  "scientific_name": "String",
  "category": "String",
  "conservation_status": "String",
  "image_url": "String (e.g. '/images/species/green_turtle.jpg')",
  "description": "Text"
}
```

### Sighting

```json
{
  "sighting_id": "PrimaryKey",
  "user_id": "ForeignKey(User)",
  "species_id": "ForeignKey(Species)",
  "sighting_date": "Date",
  "location": "String",
  "depth_meters": "Float",
  "notes": "Text"
}
```

Sequelize is used for ORM and `sequelize.sync()` runs at server start (dev convenience).
## Images guide

All UI and species images should live in the frontend `public/images` folder so they are available at predictable runtime URLs and included in builds.

Canonical folders:

- `frontend/public/images/` — UI branding and icons
- `frontend/public/images/species/` — species photos referenced in the DB
## Security & roles

Recommended enhancements:

- Add a `role` field to the `User` model (enum `user` | `admin`).
- Include `role` in the JWT payload when issuing tokens.
## Demo checklist

For Stand‑Up 3 demonstration, cover the following:

**Feature demonstration**

1. User registration and login flow (show JWT in localStorage)
2. Full CRUD for sightings (create → read → update → delete)
3. Species browsing & details (with images)
4. Search & filter in action

**Technical proof**

1. Show DB relationships (Sighting → Species)
2. Show authentication middleware working (protected endpoints)
3. Demonstrate image serving and fallback
4. Show Git history and README
## Troubleshooting

- **Images not loading**: confirm files exist in `frontend/public/images/` and that `image_url` in DB points to `/images/species/<filename>`.
- **Auth errors**: check `JWT_SECRET` in `.env` and ensure the frontend sends `Authorization: Bearer <token>` header.
- **DB connection**: verify MySQL is running and `.env` DB settings are correct.
- **Server start issues**: check backend console logs for Sequelize authentication or sync errors.
## Next steps

High priority

- Add server-side validation (express-validator)
- Implement role-based access control for admin actions
- Add ownership checks for editing/deleting sightings

Medium priority

- Add integration tests for API endpoints
- Optimize images (WebP) and add responsive images
- Add skeleton loaders to improve UX

Enhancements

- Email verification, password reset, map integration for sightings, data export

---

<div align="center">
Built with ❤️ for marine conservation — Poseidon's Notebook
</div>

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

A full-stack CRUD web app to record, browse and track marine species sightings.

- Backend: Node + Express + Sequelize (MySQL)
- Frontend: React (Create React App)

This repo contains the server, database models and the SPA UI for users to sign up, log in, add sightings and view species details.

---

## Table of contents

- [Key features](#key-features)  
- [Tech stack](#tech-stack)  
- [Repository structure](#repository-structure)  
- [Quick start (development)](#quick-start-development)  
- [Build & serve (production)](#build--serve-production)  
- [API overview](#api-overview)  
- [Database / models (high-level)](#database--models-high-level)  
- [Images — exact locations & naming](#images---exact-locations--naming)  
- [Security & roles (recommended)](#security--roles-recommended)  
- [Demo checklist for Stand‑Up 3](#demo-checklist-for-stand‑up-3)  
- [Troubleshooting](#troubleshooting)  
- [Next steps / recommended improvements](#next-steps--recommended-improvements)

---

## Key features

- User registration and login (JWT auth)
- CRUD for sightings (create, read, update, delete)
- Species browsing, detail pages and the ability to add species from the UI
- Image support for species and UI assets
- Search, filter and loading states on core pages

---

## Tech stack

- Backend: Node.js, Express, Sequelize, MySQL, jsonwebtoken, bcryptjs
- Frontend: React, react-router, framer-motion
- Build: Create React App (frontend), served by backend static middleware

---

## Repository structure (top-level)

```
/backend          # Express server, config/db.js, models, server.js
/routes           # API route handlers (auth, species, sightings)
 /frontend        # React app (source in frontend/src and build in frontend/build)
   /public        # Static files served as-is (place images here)
   /src/assets    # Developer image assets that may be bundled
README.md
Procfile
package.json
```

---

## Quick start (development)

1. Install dependencies
```powershell
# from repo root
cd backend
npm install
cd ../frontend
npm install
```

2. Create backend `.env` (in `backend/`) with required variables:
```
PORT=5000
JWT_SECRET=your_jwt_secret
# A full DB URL or the following individual DB settings:
DB_NAME=poseidons_db
DB_USER=root
DB_PASSWORD=mysecret
DB_HOST=localhost
DB_PORT=3306
# Or (for Heroku/JawsDB) JAWSDB_URL or DATABASE_URL
```

3. Run the backend and frontend in two terminals:
```powershell
# backend
cd backend
npm run dev   # or npm start

# frontend
cd frontend
npm start
```

- Frontend local URL: http://localhost:3000  
- Backend API: http://localhost:5000/api/* (if PORT=5000)

---

## Build & serve (production)

1. Build frontend:
```powershell
cd frontend
npm run build
```

2. Deploy `frontend/build` with your server. The backend is already set up to serve static files and map `/images` to `frontend/public/images`, so images referenced as `/images/...` will resolve.

---

## API overview

Base path: `/api`

- `POST /api/auth/register` — register a new user
- `POST /api/auth/login` — login (returns JWT)
- `GET  /api/species` — list species
- `GET  /api/species/:id` — species details
- `POST /api/species` — create species
- `GET  /api/sightings` — list sightings
- `POST /api/sightings` — create sighting (protected)
- `PUT  /api/sightings/:id` — update sighting (protected)
- `DELETE /api/sightings/:id` — delete sighting (protected)

Notes:
- The server uses JWT-based auth (see `backend/middleware/auth.js`).
- Confirm exact request/response shapes in `routes/*.js` when using the API.

---

## Database / models (high-level)

- `User`: username, email, password (recommend: add `role` field for role-based access)
- `Species`: species_id, common_name, scientific_name, category, conservation_status, image_url, description, etc.
- `Sighting`: sighting_id, user_id, species_id, sighting_date, location, depth_meters, notes

Sequelize is used for ORM and `sequelize.sync()` runs at server start (dev convenience).

---

## Images — exact locations & naming

Place images inside the frontend public folder so they are served at predictable runtime URLs and included in builds.

Canonical folders:

- UI / branding / icons:
  - `frontend/public/images/`
- Species photos (referenced in DB as `/images/species/<file>`):
  - `frontend/public/images/species/`

Why: Files in `frontend/public/` are copied into the build and served as `/images/...`. The backend maps `/images` to `../frontend/public/images` so species image paths stored as `/images/species/foo.jpg` will resolve both in dev and after deploy.

Minimal recommended files to add (copy these exact names/paths):

- UI / branding (place in `frontend/public/images/`):
  - `logo.png`
  - `heroImage.gif` (or JEPG/PNG)
  - `LogSightings.jpeg`
  - `TrackSpecies.jpeg`
  - `icons/facebook.png`
  - `icons/twitter.png`
  - `icons/instagram.png`
  - `icons/tik-tok.png`

- Species photos (place in `frontend/public/images/species/`):
  - `species_placeholder.jpg` — generic fallback
  - Example species (or use slugs matching DB `image_url`):
    - `green_turtle.jpg`
    - `dusky_shark.jpg`
    - `blue_ringed_octopus.jpg`
    - `turtle.png`
    - `sighting.jpeg`

How to reference images (DB / frontend):
- Store `image_url` values as `/images/species/<filename>` (e.g. `/images/species/green_turtle.jpg`)
- In the frontend `getImageUrl` helper (frontend/src/api.js) will construct the correct path to the image.

Naming guidelines:
- Lowercase, underscores or hyphens, no spaces
- Use `.jpg`, `.jpeg`, `.png` (or `.webp` for compressed images)
- Optimize images for web (compress and resize)

Quick PowerShell examples to copy assets (run from repo root):
```powershell
# create species folder
New-Item -ItemType Directory -Force -Path "frontend/public/images/species"

# copy specific files from src/assets to public/images
Copy-Item -Path "frontend/src/assets/logo.png" -Destination "frontend/public/images/logo.png"
Copy-Item -Path "frontend/src/assets/heroImage.gif" -Destination "frontend/public/images/heroImage.gif"
Copy-Item -Path "frontend/src/assets/turtle.png" -Destination "frontend/public/images/species/turtle.png"
Copy-Item -Path "frontend/src/assets/species.jpeg" -Destination "frontend/public/images/species/species_placeholder.jpg"
```

---

## Security & roles (recommended)

- Add a `role` property to the `User` model (e.g., `user`, `admin`) if you need admin-only actions (editing/deleting species).
- Include the `role` in the JWT payload when issuing tokens. Create an `authorizeRole` middleware to protect admin routes (only allow role `admin`).
- Ownership checks: ensure that editing/deleting a sighting verifies that `req.user.id === sighting.user_id || req.user.role === 'admin'`.

---

## Demo checklist for Stand‑Up 3

Prepare to show:
1. Self-determined feature list (what changed since Stand-Up 2).
2. Login/register flow, show token in localStorage.
3. CRUD demo for sightings (create → read → update → delete).
4. Species browse and detail pages; if species create/update/delete are admin-only, show admin flow or explain how it would work.
5. Database relationships (Sighting → Species foreign key).
6. Repo history and README (show recent commits and branch).
7. Known issues & next steps for final submission.

---

## Troubleshooting

- Images 404: verify files exist in `frontend/public/images/...` and in `frontend/build/images/` after build.
- Auth errors (401/403): verify `JWT_SECRET` and that frontend sets `Authorization: Bearer <token>` header.
- Server startup errors: check `backend/server.js` logs (Sequelize `authenticate()` and `sync()` messages).
- If `npm run dev` references `app.js` in backend scripts but your entry file is `server.js`, run `node server.js` or update `package.json` scripts.

---

## Next steps / recommended improvements

- Add server-side validation for POST/PUT endpoints (use `express-validator` or manual checks).
- Add `role` to `User` and an admin-only section for species management.
- Add tests for core API endpoints (basic integration tests).
- Add image optimisation (WebP and responsive srcsets) and skeleton loaders for a more polished UX.

---

If you'd like, I can:
- Add a short "Stand‑Up 3" summary paragraph you can paste into the README (completed vs. remaining tasks), or
- Generate the exact PowerShell commands to copy/move multiple images from `frontend/src/assets/` into `frontend/public/images/` and normalize filenames for you to run locally.
