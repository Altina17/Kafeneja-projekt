# ☕ Kafeneja - Sistem për Menaxhimin e Kafenese

Sistem i plotë për menaxhimin e kafenese, duke përfshirë menynë, porositë, stafin, inventarin dhe pagesat.

## 🛠️ Teknologjitë e Përdorura

**Frontend:**
- ReactJS (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- React Toastify

**Backend:**
- Node.js
- Express.js
- JWT Authentication
- bcryptjs

**Databaza:**
- MySQL

## 📋 Kërkesat

- Node.js v18+
- MySQL 8.0+
- npm

## 🚀 Si të Instalohet

### 1. Klono projektin
\`\`\`bash
git clone https://github.com/Altina17/Kafeneja-projekt.git
cd Kafeneja-projekt
\`\`\`

### 2. Instalo backend
\`\`\`bash
cd backend
npm install
\`\`\`

### 3. Konfiguro .env në backend
\`\`\`env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=fjalëkalimi_yt
DB_NAME=kafeneja_db
JWT_SECRET=secret_key
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_SECRET=refresh_secret
REFRESH_TOKEN_EXPIRES_IN=7d
\`\`\`

### 4. Importo databazën
- Hap MySQL Workbench
- Shko te Server → Data Import
- Importo fajllin SQL nga folder-i `/database`

### 5. Instalo frontend
\`\`\`bash
cd ../frontend
npm install
\`\`\`

### 6. Konfiguro .env në frontend
\`\`\`env
VITE_API_URL=http://localhost:5000/api
\`\`\`

### 7. Starto projektin
\`\`\`bash
cd ..
npm start
\`\`\`

## 📁 Struktura e Projektit

\`\`\`
Kafeneja-projekt/
├── backend/
│   ├── config/         # Konfigurimi i databazës
│   ├── controllers/    # Logjika e biznesit
│   ├── middleware/     # JWT middleware
│   ├── models/         # Query-t e databazës
│   ├── routes/         # API routes
│   └── server.js       # Pika hyrëse e serverit
├── frontend/
│   ├── src/
│   │   ├── api/        # Axios konfigurimi
│   │   ├── components/ # Komponentet e ripërdorshëm
│   │   ├── context/    # Auth context
│   │   └── pages/      # Faqet e aplikacionit
│   └── index.html
└── README.md
\`\`\`

## 🔐 Siguria

- JWT Token për autentifikim
- Refresh Token i ruajtur në databazë
- Token dërgohet vetëm në Header (jo localStorage)
- Fjalëkalimet enkriptohen me bcrypt

## 📊 Entitetet e Sistemit

- **Produktet** - Menaxhimi i menysë
- **Kategorite** - Kategoritë e produkteve
- **Porositë** - Menaxhimi i porosive
- **Detajet Porosive** - Detajet e çdo porosie
- **Tavolinat** - Menaxhimi i tavolinave
- **Punetoret** - Stafi i kafenese
- **Inventari** - Menaxhimi i stokut
- **Furnitoret** - Furnitorët e kafenese
- **Rezervimet** - Rezervimet e tavolinave
- **Turnet** - Oraret e punetorëve
- **Shpenzimet** - Menaxhimi i shpenzimeve
- **Porositë Furnitoreve** - Porositë tek furnitorët

## 👥 Ekipi

- Anita Fetahu
- Altina Rramanaj

## 📅 Universiteti per Biznes dhe Teknologji

Lënda: Laborator Kurs 1 - 2025/2026