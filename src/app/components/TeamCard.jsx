export default function TeamCard ({team}){
    return <div>
        <li key={team.id}>{team.full_name}</li>
    </div>
}