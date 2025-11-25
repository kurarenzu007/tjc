# TJ Sims Autoparts Management System

Unified full-stack platform for TJC Auto Supply covering public product browsing, order tracking, and an admin portal for day-to-day operations.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Key Features](#key-features)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Getting Started](#getting-started)
6. [Backend Configuration](#backend-configuration)
7. [Available Scripts](#available-scripts)
8. [API Highlights](#api-highlights)
9. [Next Steps](#next-steps)

## Project Overview

TJ Sims (TJC Auto Supply) is a capstone autoparts management system with:

- A **client-facing site** for browsing inventory and tracking order status
- A **role-secured admin dashboard** covering inventory, sales, suppliers, delivery, and reporting
- A **RESTful Express API** backed by MySQL for reliable data persistence

## Key Features

### Client Experience
- Landing page with marketing highlights and quick CTAs
- Real-time **product catalog** with category chips, keyword search, stock levels, and detail modal previews @tjsims/src/pages/client/Products.jsx#15-220
- **Order status tracker** where customers input sale numbers to view fulfillment and payment progress @tjsims/src/pages/client/OrderStatus.jsx#34-177
- Contact information and static pages for support (see `/contact-us` route)

### Admin Portal
- **Authentication & role guard** (`PrivateRoute`) for admin/driver flows @tjsims/src/App.jsx#40-134
- Dashboards with sales KPIs, fast/slow moving products, inventory alerts
- Inventory CRUD, supplier management, stock-in, returns, and serial tracking (`inventoryAPI`, `suppliersAPI`, `serialNumberAPI`) @tjsims/src/utils/api.js#218-463
- Sales module with PDF/CSV exports, delivery proof uploads, and payment tracking
- Orders workflow plus dedicated delivery portal for drivers
- Advanced **reports builder** for sales, inventory, and returns with filter presets @tjsims/src/utils/api.js#267-306
- Settings area for business profile, preferences, and user management

### Backend Services
- Express.js REST API with modular controllers, routes, and services
- MySQL connection pooling, seed scripts, and structured schema (`database_setup.sql`)
- Security middleware: Helmet, CORS, rate limiting, validation
- Health checks, graceful shutdown, and centralized error handling

## Tech Stack

| Layer       | Tools |
|-------------|-------|
| Frontend    | React 19, Vite, React Router 6, Chart.js, html2canvas, jsPDF |
| Backend     | Node.js 18+, Express.js, mysql2, Joi, Multer |
| Auth/Security | bcryptjs, jsonwebtoken (planned), Helmet, express-rate-limit, CORS |
| Dev Tooling | ESLint 9, Vite HMR, Nodemon |

## Project Structure

```
├── README.md                # You are here
└── tjsims/
    ├── README.md            # Frontend starter (Vite)
    ├── backend/
    │   ├── README.md        # Detailed API docs
    │   ├── src/
    │   │   ├── controllers/
    │   │   ├── routes/
    │   │   └── ...
    │   └── database_setup.sql
    ├── src/                 # React app (client + admin portal)
    └── package.json
```

## Getting Started

### 1. Clone & install

```bash
git clone https://github.com/kurarenzu007/tjc.git
cd tjc-clone/tjsims

# Frontend deps
npm install

# Backend deps
cd backend
npm install
```

### 2. Environment
- Copy `backend/.env.example` → `backend/.env`
- Provide MySQL credentials, DB name, and optional JWT/file upload settings

### 3. Run services

```bash
# Terminal 1 – backend
cd tjsims/backend
npm run dev

# Terminal 2 – frontend
cd tjsims
npm run dev
```

- API defaults to `http://localhost:5000`
- Vite dev server defaults to `http://localhost:5173`

## Backend Configuration

Key `.env` values (see `tjsims/backend/README.md` for full list):

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=tjsims_db
DB_USER=root
DB_PASSWORD=your_mysql_password
FRONTEND_URL=http://localhost:5173
```

### Database
```bash
mysql -u root -p -e "CREATE DATABASE tjsims_db;"
mysql -u root -p tjsims_db < backend/database_setup.sql
```

## Available Scripts

| Location | Command | Description |
|----------|---------|-------------|
| `/tjsims` | `npm run dev` | Start Vite dev server |
| `/tjsims` | `npm run build` | Production bundle |
| `/tjsims` | `npm run preview` | Preview built frontend |
| `/tjsims/backend` | `npm run dev` | Nodemon API server |
| `/tjsims/backend` | `npm start` | Production Express server |

## API Highlights

- `/api/products` — catalog CRUD, filters for search/category/brand/status @tjsims/backend/src/controllers/ProductController.js
- `/api/inventory/*` — stock adjustments, bulk stock-in, returns to supplier @tjsims/src/utils/api.js#218-265
- `/api/sales` — create/update orders, status, payment tracking, delivery proof upload @tjsims/src/utils/api.js#158-216
- `/api/reports` — paginated sales/inventory/returns with summaries and export-ready data @tjsims/src/utils/api.js#267-306
- `/api/dashboard` — KPIs for charts, low-stock, category mix @tjsims/src/utils/api.js#308-346
- `/api/serial-numbers` — serial assignment, availability, defect handling @tjsims/src/utils/api.js#381-429

Refer to `tjsims/backend/README.md` for the exhaustive endpoint list and request payloads.

## Next Steps / Ideas

1. Implement JWT-authenticated sessions end-to-end
2. Add product image uploads & CDN delivery
3. Integrate notifications (email/SMS) for order updates
4. Add unit/integration tests plus CI workflows
5. Publish API docs via Swagger or Postman collections

---

Need help or want more details? Open an issue or reach out via the project maintainers.
