import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { STAT_LABELS } from '@/constants/statKeys';

export default function StatChangesTable({ seasonAverages, lastNGamesAvg }) {
  // Define which stats to show in the table
  const statsToShow = [
    { key: 'pts', label: 'Points' },
    { key: 'reb', label: 'Rebounds' },
    { key: 'ast', label: 'Assists' },
    { key: 'ts', label: 'True Shooting %' },
    { key: 'efg', label: 'Effective FG%' },
    { key: 'ast_to_tov', label: 'AST/TO' },
    { key: 'stl', label: 'Steals' },
    { key: 'blk', label: 'Blocks' },
  ];

  // Calculate changes between season averages and recent games
  const statChanges = statsToShow.map(({ key, label }) => {
    const seasonValue = seasonAverages[key] || 0;
    const recentValue = lastNGamesAvg[key] || 0;
    
    // Handle percentage fields
    if (key === 'ts' || key === 'efg') {
      const seasonPercent = seasonValue * 100;
      const recentPercent = recentValue * 100;
      const change = Number((recentPercent - seasonPercent).toFixed(1));
      return {
        stat: label,
        change,
      };
    }
    
    const change = Number((recentValue - seasonValue).toFixed(1));
    return {
      stat: label,
      change,
    };
  });

  return (
    <Card className="max-w-6xl mx-auto mt-4">
      <CardHeader>
        <CardTitle>Stat Changes</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Stat</TableHead>
              <TableHead>Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {statChanges.map(({ stat, change }) => (
              <TableRow key={stat}>
                <TableCell>{stat}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={change > 0 ? "text-green-600 border-green-400" : "text-red-600 border-red-400"}
                  >
                    {change > 0 ? `+${change}` : change}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
