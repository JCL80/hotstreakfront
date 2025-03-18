import Link from 'next/link';
import Image from 'next/image';
import { nbaTeamMap } from '../constants/nbaTeamMap';

const TeamCard = ({ team }) => {
  const teamLogoUrl = nbaTeamMap[team.id].logo;

  return (
    <Link href={`/teams/${team.id}`}>
        <div className="rounded-2xl shadow-lg p-4 bg-white">
      <div className="flex items-center justify-center">
        <Image
          src={teamLogoUrl}
          alt={team.full_name}
          width={100}
          height={100}
          className="rounded-full shadow-md"
        />
      </div>
      <div className="mt-2 text-center">
        <h2 className="text-lg font-bold">{team.full_name}</h2>
        <p className="text-sm text-gray-500">{team.city || 'Unknown City'}</p>
        <p className="text-xs text-gray-400">{team.conference.trim() || 'Historic Team'} - {team.division || 'N/A'}</p>
      </div>
    </div>
    </Link>
    
  );
};

export default function TeamDisplay({teams}) {
    const activeTeams = teams.filter(team => team.id >= 1 && team.id <= 30);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-gray-100">
      {activeTeams.map(team => (
        <TeamCard key={team.id} team={team} />
      ))}
    </div>
  );
}