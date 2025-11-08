# CarHaven MVP

A production-capable MERN-stack mini product for a car dealership website.

## Tech Stack
- **Frontend:** React (Vite), TailwindCSS, React Router, Axios, react-hook-form + zod
- **Backend:** Node.js (Express), MongoDB (Mongoose), JWT Authentication, bcrypt, CORS
- **DB:** MongoDB (Docker image via docker-compose)
- **Dev/Ops:** Dockerfiles (frontend + backend), docker-compose (frontend, backend, MongoDB)
- **Quality:** ESLint + Prettier, health endpoint, seed script with 10 cars

## Wireframe (ASCII)
**Home**
```
+-------------------------------------------------+
|  Navbar                                         |
+-------------------------------------------------+
|  Hero: Search CTA + Featured Cars cards (grid)  |
+-------------------------------------------------+
|  Footer                                         |
+-------------------------------------------------+
```

**Listings**
```
+-----------------------------------------------+
| Filters (make/model/price/year/search)        |
+-----------------------------------------------+
| Grid of Car Cards with Pagination             |
+-----------------------------------------------+
```

**Car Detail**
```
+---------------------------+------------------+
| Large Image               | Details          |
|                           | Price, Specs     |
|                           | Contact CTA      |
+---------------------------+------------------+
```

**Admin**
```
+-----------------------------------------------+
| Form to Add/Edit Cars                         |
| Table/List of existing cars with Edit/Delete  |
+-----------------------------------------------+
```

## Run Locally (no Docker)
### 1) Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```
API: http://localhost:5000

### 2) Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev -- --port 3000
```
App: http://localhost:3000

> Ensure `VITE_API_URL` in `frontend/.env` points to your backend (default: http://localhost:5000).

## Run with Docker Compose
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
docker-compose up -d --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB: mongodb://mongo:27017/carhaven

## Seeding the Database
```bash
cd backend
npm run seed
```

## Health Check
```
GET /api/health  -> { status: "ok" }
```

## VS Code Tips
- Install **ESLint** and **Prettier** extensions.
- Use workspace settings to format on save.

## Decode the Base64 ZIP in this README's companion message
1. Save base64 content to `carhaven_b64.txt`
2. Decode to `carhaven_mvp.zip`:
   ```bash
   base64 -d carhaven_b64.txt > carhaven_mvp.zip
   ```
3. Extract:
   ```bash
   unzip carhaven_mvp.zip -d ./
   ```
