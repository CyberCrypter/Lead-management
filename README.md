# CRM Lead Management System

A full-stack Lead Management System with secure admin authentication, lead lifecycle tracking, file attachments, and dashboard analytics.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Axios, React Router
- Backend: Node.js, Express, MongoDB (Mongoose), JWT, Joi, Multer

## Project Structure

```text
Lead-management/
  backend/
  frontend/
```

## Project Setup Steps

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd Lead-management
```

### 2. Install dependencies

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies:

```bash
cd ../frontend
npm install
```

### 3. Configure environment variables

Create a `.env` file in `backend/` with:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/crm
JWT_SECRET=your_strong_jwt_secret
CLIENT_URL=http://localhost:5173
```

Create a `.env` file in `frontend/` (optional if using Vite proxy):

```env
VITE_API_BASE_URL=/api
```

## How To Run Backend And Frontend

### Run backend

From `backend/`:

```bash
npm run dev
```

Backend runs on: `http://localhost:5000`

### Run frontend

From `frontend/`:

```bash
npm run dev
```

Frontend runs on: `http://localhost:5173`

## API / Frontend Integration Notes

- Frontend uses Vite proxy for `/api` and `/uploads` to `http://localhost:5000`.
- If you want to bypass proxy, set `VITE_API_BASE_URL` in frontend `.env` to your backend API URL.

## Features Explanation

### 1. Admin Authentication

- Register and login with email/password.
- Passwords are securely hashed with bcrypt.
- JWT-based authentication for protected APIs.
- Auth state persists in localStorage and is revalidated on app load.

### 2. Protected App Access

- Dashboard and leads pages are protected routes.
- Unauthorized users are redirected to login.

### 3. Lead Management (CRUD)

- Create leads with name, email, phone, notes, and optional attachment.
- View all leads created by the logged-in admin.
- Edit lead details.
- Delete leads.
- Fetch single lead details by ID.

### 4. Lead Status Workflow

- Statuses: `New`, `Contacted`, `Converted`.
- Update lead status directly from the leads list.
- Store optional response message while updating status.

### 5. Search And Filtering

- Search leads by name, email, or phone.
- Filter leads by status.

### 6. File Upload Support

- Upload attachments when creating or updating a lead.
- Supported types include images (JPG/PNG/WEBP), PDF, and Word documents.
- Uploaded files are served from `/uploads`.

### 7. Dashboard Analytics

- Displays key metrics:
  - Total leads
  - Contacted leads
  - Converted leads

### 8. Validation And Error Handling

- Joi-based backend validation for auth and lead payloads.
- Proper API responses for invalid input, auth errors, and not found routes.

## Default API Endpoints (Summary)

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Leads (Protected)

- `GET /api/leads`
- `GET /api/leads/:id`
- `POST /api/leads`
- `PUT /api/leads/:id`
- `DELETE /api/leads/:id`
- `PATCH /api/leads/:id/status`

## Scripts

### Backend (`backend/package.json`)

- `npm run dev` - Run backend with watch mode
- `npm start` - Run backend in normal mode

### Frontend (`frontend/package.json`)

- `npm run dev` - Start Vite dev server
- `npm run build` - Build production assets
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Notes

- Ensure MongoDB is running before starting backend.
- Keep your `.env` files private and never commit secrets.
