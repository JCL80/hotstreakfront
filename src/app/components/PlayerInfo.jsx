import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function PlayerInfo({ playerBio }) {
  console.log("playerBio", playerBio);
  return (
    <Card className="lg:col-span-1 rounded-2xl ">
      <CardContent className="p-6 flex flex-col items-center space-y-2">
        <Image
          src={playerBio.image_url}
          alt={`${playerBio.first_name} ${playerBio.last_name}`}
          height={100}
          width={100}
          className="rounded-full shadow mb-3 border-4 "
        />
        <h1 className="text-2xl font-bold text-center ">
          {playerBio.first_name} {playerBio.last_name}
        </h1>
        {playerBio.team && (
          <Link
            href={`/teams/${playerBio.team.id}`}
            className="flex items-center gap-2"
          >
            <Image
              src={playerBio.team.logo_url}
              alt="Team Logo"
              width={30}
              height={30}
            />
            <span className="text-lg font-semibold">
              {playerBio.team.full_name}
            </span>
          </Link>
        )}

        <div className="grid grid-cols-3 gap-4 text-center w-full mt-4">
          {[
            ["PG", "Position"],
            [`#${playerBio.jersey_number || "N/A"}`, "Number"],
            [playerBio.height || "Unknown", "Height"],
            [playerBio.country || "Unknown", "Country"],
            [playerBio.college || "Unknown", "College"],
            [
              playerBio.weight ? `${playerBio.weight} lbs` : "Unknown",
              "Weight",
            ],
          ].map(([value, label]) => (
            <div key={label} className="flex flex-col items-center">
              <span className="font-bold text-lg">{value}</span>
              <span className="text-xs">{label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
