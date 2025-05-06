import Link from 'next/link';
import Image from 'next/image';

const TeamCard = ({ team }) => {
  const teamLogoUrl = team.logoUrl;

  return (
    <Link href={`/teams/${team.id}`}>
        <div className="rounded-2xl shadow-lg p-4 bg-white">
      <div className="flex items-center justify-center">
        <Image
          src={teamLogoUrl}
          alt={team.fullName}
          width={100}
          height={100}
          className="rounded-full shadow-md"
        />
      </div>
      <div className="mt-3 text-center space-y-1">
          <h2 className="text-lg font-bold leading-tight">{team.fullName}</h2>
          <p className="text-sm text-gray-600">
            {team.city}, {team.state}
          </p>

          <p className="text-xs text-gray-400 tracking-wide">
            “{team.nickname}” • Founded {team.yearFounded}
          </p>
        </div>
    </div>
    </Link>
  );
};

export default function TeamDisplay({teams}) {
    const activeTeams = teams

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-gray-100">
      {activeTeams.map(team => (
        <TeamCard key={team.id} team={team} />
      ))}
    </div>
  );
}