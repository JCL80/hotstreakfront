/* eslint-disable react/no-unescaped-entities */

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-8 flex flex-col items-center">
      {/* Hero Section */}
      <header className="w-full max-w-5xl text-center py-10">
        <h1 className="text-4xl font-extrabold tracking-wide mb-4 text-blue-600">
          NBA Hot Streak Tracker 🔥
        </h1>
        <p className="text-lg text-gray-700">
          Discover which NBA players are **on fire** and who’s stuck in a **cold streak** ❄️.
          Get real-time stats, performance trends, and insights into player efficiency.
        </p>
      </header>

      {/* Feature Highlights */}
      <section className="w-full max-w-4xl grid md:grid-cols-3 gap-6 mt-10">
        <div className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-300">
          <h2 className="text-xl font-bold text-red-500">🔥 Real-Time Stats</h2>
          <p className="text-gray-600">We fetch live data and analyze player trends instantly.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-300">
          <h2 className="text-xl font-bold text-yellow-500">📊 Heat Index</h2>
          <p className="text-gray-600">Our custom "Heat Index" determines who's playing at their peak.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-300">
          <h2 className="text-xl font-bold text-blue-500">❄️ Slumps Detected</h2>
          <p className="text-gray-600">See which players are struggling and why.</p>
        </div>
      </section>

      {/* Shortcomings Section */}
      <section className="w-full max-w-4xl mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-300">
        <h2 className="text-2xl font-bold text-red-500 mb-2">🚧 Current Shortcomings</h2>
        <ul className="list-disc text-gray-700 ml-5 space-y-2">
          <li>API limitations may cause occasional data delays.</li>
          <li>Historical data is currently limited to recent games.</li>
          <li>Advanced stats and predictive analytics are in progress.</li>
        </ul>
      </section>

      {/* Call-to-Action */}
      <div className="mt-10">
        <Link href="/teams">
          <span className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all cursor-pointer">
            Explore Teams 🚀
          </span>
        </Link>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-gray-500 text-sm">
        Built with ❤️ by an NBA fan. Data powered by BallDontLie API.
      </footer>
    </div>
  );
}
