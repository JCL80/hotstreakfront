export default function Upcoming (){
    return <section className="w-full mx-auto max-w-4xl mt-20" id="upcoming">
    <h2 className="text-4xl font-bold text-foreground mb-6 text-center">
      Upcoming Features
    </h2>
  
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
      {/* Leaderboard */}
      <div className="bg-white/60 backdrop-blur border border-border/60 shadow-sm rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-1 text-orange-600">
          🔥 Player Leaderboards
        </h3>
        <p className="text-sm text-muted-foreground">
          See who’s currently dominating — ranked by your Heat Index preferences. Filter by position, team, or games played.
        </p>
      </div>
  
      {/* Team Pages */}
      <div className="bg-white/60 backdrop-blur border border-border/60 shadow-sm rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-1 text-orange-600">
          🏀 Team Dashboards
        </h3>
        <p className="text-sm text-muted-foreground">
          View rosters with player streak status, average team Heat Index, and quick comparison tools for coaching decisions or fan debates.
        </p>
      </div>
  
      {/* More Customization */}
      <div className="bg-white/60 backdrop-blur border border-border/60 shadow-sm rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-1 text-orange-600">
          ⚙️ More Stat Customization
        </h3>
        <p className="text-sm text-muted-foreground">
          Choose from even more advanced stats (like usage rate, defensive rating, or shot zones) to personalize your formula deeper.
        </p>
      </div>
  
      {/* Playoff Tracking */}
      <div className="bg-white/60 backdrop-blur border border-border/60 shadow-sm rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-1 text-orange-600">
          🧊 Playoff Mode
        </h3>
        <p className="text-sm text-muted-foreground">
          Activate a special playoff-only filter to see who’s stepping up or disappearing when it matters most.
        </p>
      </div>
    </div>
  </section>
  
}