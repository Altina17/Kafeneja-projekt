# ☕ Kafeneja Projekt

Sistem për menaxhimin e kafenese, duke përfshirë menynë, porositë, stafin, inventarin dhe pagesat.

## 🚀 Teknologjitë

- **Backend:** Node.js + Express.js
- **Frontend:** React.js + Tailwind CSS
- **Databaza:** MySQL
- **Autentifikimi:** JWT + Refresh Token

## 📦 Instalimi

### Backend
cd backend
npm install
npm run dev

### Frontend
cd frontend
npm install
npm run dev

## 🔐 Variablat e Mjedisit (.env)

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=kafeneja_db
DB_PORT=3306
JWT_SECRET=your_secret
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_SECRET=your_refresh_secret
REFRESH_TOKEN_EXPIRES_IN=7d
PORT=5000

## 📋 API Endpoints

| Method | Endpoint | Përshkrimi |
|--------|----------|------------|
| POST | /api/auth/register | Regjistrim |
| POST | /api/auth/login | Login |
| POST | /api/auth/refresh | Refresh Token |
| POST | /api/auth/logout | Logout |
| GET | /api/products | Produktet |
| GET | /api/categories | Kategorite |
| GET | /api/orders | Porositë |
| GET | /api/tables | Tavolinat |
| GET | /api/employees | Punetoret |
| GET | /api/inventari | Inventari |
| GET | /api/furnitoret | Furnitoret |
| GET | /api/rezervimet | Rezervimet |
| GET | /api/turnet | Turnet |
| GET | /api/shpenzimet | Shpenzimet |
| GET | /api/porosite-furnitor | Porositë Furnitoreve |

## 👥 Grupi
- Altina Rramanaj
- Anita Fetahu