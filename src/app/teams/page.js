
import TeamDisplay from "../components/TeamDisplay";
import api from "../utils/api";

export default async function TeamsPage() {
  let teams = [];
 
  const res = await api.get("/api/nba/teams/all"); // Adjust to your domain
  teams = res.data

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">NBA Teams</h1>
      <ul className="mt-4">
       
        <TeamDisplay teams={teams}/>
      </ul>
    </div>
  );
}
