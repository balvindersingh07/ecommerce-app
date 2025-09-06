# ShopSage — E‑Commerce App

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react\&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite\&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-06B6D4?logo=tailwindcss\&logoColor=white)](https://tailwindcss.com)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com)

A lightweight **React + Vite** E‑Commerce front‑end styled with **Tailwind CSS**. It features a modern storefront UI, featured-products grid, and a clean sign‑in flow.

> **Live Demo:** [https://ecommerce-app-ruby-seven.vercel.app/](https://ecommerce-app-ruby-seven.vercel.app/)
> **Repository:** [https://github.com/balvindersingh07/ecommerce-app](https://github.com/balvindersingh07/ecommerce-app)

---

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Project Structure](#project-structure)
* [Getting Started](#getting-started)
* [Available Scripts](#available-scripts)
* [Environment Variables](#environment-variables)
* [Build & Deployment](#build--deployment)
* [Screenshots](#screenshots)
* [Roadmap](#roadmap)
* [Troubleshooting](#troubleshooting)
* [Contributing](#contributing)
* [License](#license)

---

## Features

* ⚡ **Fast dev** experience via Vite + HMR
* 🎨 **Tailwind CSS** utility-first styling
* 📱 **Responsive** layout (mobile → desktop)
* 🧩 **Modular components** (cards, grids, navbar, badges)
* 🛒 **Product cards** with price, discount badges, rating, wishlist & cart CTAs
* 🧭 **Header UX** with currency & language selectors
* 🔐 **Auth UI**: Sign‑in form with show/hide password
* 🧮 Optional **dashboard widgets** (orders, revenue, customers — extend as needed)

> Tip: If you add cart/checkout, product details, or backend APIs, list them here.

---

## Tech Stack

* **Framework:** React (Vite)
* **Styling:** Tailwind CSS, PostCSS
* **Language:** JavaScript (ESNext)
* **Tooling:** ESLint
* **Deploy:** Vercel

---

## Project Structure

> Adjust if your repo layout differs.

```
ecommerce-app/
├─ public/
├─ src/
│  ├─ assets/            # images, icons
│  ├─ components/        # reusable UI components
│  ├─ pages/             # route-level components (if using routing)
│  ├─ data/              # mock/static data (if any)
│  ├─ hooks/             # custom hooks (optional)
│  ├─ App.jsx
│  └─ main.jsx
├─ index.html
├─ package.json
├─ postcss.config.cjs
├─ tailwind.config.js
├─ vite.config.js
└─ README.md
```

---

## Getting Started

### Prerequisites

* **Node.js** ≥ 18 (LTS recommended)
* **npm** ≥ 9

### Installation

```bash
# 1) Clone the repo
git clone https://github.com/balvindersingh07/ecommerce-app.git
cd ecommerce-app

# 2) Install dependencies
npm install

# 3) Start the dev server
npm run dev
```

The app will start on the port shown in your terminal (commonly `http://localhost:5173`).

---

## Available Scripts

```bash
npm run dev       # Start Vite dev server (HMR)
npm run build     # Production build to dist/
npm run preview   # Preview the production build locally
```

> If you add linting or tests, document their scripts here (e.g., `npm run lint`, `npm run test`).

---

## Environment Variables

This template does **not** require environment variables by default. If you integrate an API:

1. Create a `.env` file in the project root.
2. Prefix variables with `VITE_` so Vite can expose them to the client.

   ```dotenv
   VITE_API_BASE_URL=https://api.example.com
   ```
3. Access in code via `import.meta.env.VITE_API_BASE_URL`.

> Never commit secrets to the repo.

---

## Build & Deployment

### Local Production Build

```bash
npm run build    # outputs to dist/
npm run preview  # serve the built app locally
```

### Vercel (Recommended)

* Connect your GitHub repo on **Vercel**.
* Build Command: `npm run build`
* Output Directory: `dist`
* Framework Preset: **Vite**
* Configure any environment variables under *Project Settings → Environment Variables*.

After deployment, update the **Live Demo** link above if your domain changes.

---

## Roadmap

* Product details page
* Cart & checkout flow
* Auth integration with a real backend (JWT/Firebase/Supabase)
* Filtering, sorting & pagination for products
* Unit/UI tests

---

## Troubleshooting

* Blank screen or CSS not applied → ensure Tailwind is set up (content paths in `tailwind.config.js`, `@tailwind` directives in `index.css`).
* Port already in use → start Vite on another port: `npm run dev -- --port 5174`.
* 404 on refresh with client routing → configure a SPA fallback (Vercel handles this by default).

---

## Contributing

1. Fork the project
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit changes: `git commit -m "feat: add your feature"`
4. Push to branch: `git push origin feat/your-feature`
5. Open a Pull Request

---

## License

No license file is present yet. If you’d like to open‑source this project, add a `LICENSE` (e.g., MIT) at the repo root and update this section.
