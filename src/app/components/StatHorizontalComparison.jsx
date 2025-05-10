import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function StatHorizontalComparison({ seasonAverages, lastNGamesAvg }) {
  const statsToCompare = [
    { key: "pts", label: "PTS" },
    { key: "reb", label: "REB" },
    { key: "ast", label: "AST" },
    { key: "stl", label: "STL" },
    { key: "blk", label: "BLK" },
    { key: "fgp", label: "FG%" },
    { key: "tpp", label: "3P%" },
    { key: "ftm", label: "FTM" }, // could change to "FT%" if you calculate it
    { key: "plus_minus", label: "+/-" },
  ];

  const formatStat = (key, value) => {
    // Handle percentage fields that come in 0-1 format
    if (key === "fgp" || key === "tpp" || key === "ftp" || key === "ts" || key === "efg") {
      return `${(value * 100).toFixed(1)}%`;
    }
    return value.toFixed(1);
  };

  return (
    <Card className="overflow-x-auto">
      <CardHeader>
        <CardTitle>Season vs Recent</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              {statsToCompare.map(({ label }) => (
                <TableHead key={label} className="text-center text-muted-foreground">{label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              {statsToCompare.map(({ key }) => (
                <TableCell key={key} className="text-center font-semibold">
                  {formatStat(key, seasonAverages[key] || 0)}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              {statsToCompare.map(({ key }) => (
                <TableCell key={key} className="text-center font-semibold">
                  {formatStat(key, lastNGamesAvg[key] || 0)}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
