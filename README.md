# HotStreak 🔥

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
git clone https://github.com/JCL80/hotstreak.git
cd hotstreak
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with:
```
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000  # Your FastAPI backend URL
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000  # Your frontend URL
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## License

MIT License - feel free to use this code for your own projects!

## About the Developer

Built by Jorge Cambra - an NBA fan and full-stack developer passionate about sports analytics and modern web development.

---

⭐ Star this repo if you find it useful!
