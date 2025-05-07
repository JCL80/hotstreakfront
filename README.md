# HotStreak 🔥

[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![CI](https://github.com/JCL80/hotstreakfront/actions/workflows/ci.yml/badge.svg)](https://github.com/JCL80/hotstreakfront/actions)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://hotstreakfront.vercel.app/)

A modern web application that helps NBA fans track player performance trends and hot/cold streaks in real-time. Built with Next.js, TypeScript, and Tailwind CSS.

![HotStreak Preview](public/preview.png)

## Features

- 🔍 **Player Search**: Quickly find and track any active NBA player
- 📊 **Real-time Stats**: View detailed performance metrics and trends
- 🔥 **Heat Index**: Custom algorithm to determine player hot/cold streaks
- ⚙️ **Customizable**: Adjust the Heat Index formula to match your preferences
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

### Frontend
- **Framework**: Next.js 15
- **Language**: TypeScript / JavaScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Data Visualization**: Recharts
- **Database**: Supabase

### Backend
This is the frontend repository. The backend is a separate FastAPI service that provides NBA data through the "almost official" NBA API. You can find it at [hotstreak-backend](https://github.com/JCL80/hotstreak-backend).

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/JCL80/hotstreakfront.git
cd hotstreakfront
```

2. Install dependencies:
```bash
npm install
```

3. Copy env template:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

6. Run tests and lint:
```bash
npm run lint
npm run test
```

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## License & Support

This project is licensed under the [MIT License](LICENSE).

HotStreak™ was created by Jorge Cambra.  
If you use it in a venture-funded or >$100k ARR product,  
please consider sponsoring the project or arranging a support contract.

## About the Developer

Built by Jorge Cambra - an NBA fan-nerd and full-stack developer passionate about sports analytics and modern web development.

---

⭐ Star this repo if you find it useful!

---