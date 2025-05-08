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
    <div className="p-4">
      <h1 className="text-2xl font-bold">NBA Teams</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ul className="mt-4">
          <TeamDisplay teams={teams} />
        </ul>
      )}
    </div>
  );
}
