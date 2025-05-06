import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function StatChangesTable({ statChanges }) {
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
