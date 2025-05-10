"use client"; // Ensures this runs only on the client

import { useEffect, useState } from "react";
import TeamDisplay from "../components/TeamDisplay";
import api from "../utils/api";
import Loading from "../components/Loading";

export default function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTeams() {
      try {
        const res = await api.get("api/nba/teams/all");
        setTeams(res.data);
      } catch (err) {
        console.error("Error fetching teams:", err);
        setError("Failed to load teams.");
      } finally {
        setLoading(false);
      }
    }

    fetchTeams();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">NBA Teams</h1>
        {loading ? (
          <Loading />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="mt-4">
            <TeamDisplay teams={teams} />
          </div>
        )}
      </div>
    </div>
  );
}
