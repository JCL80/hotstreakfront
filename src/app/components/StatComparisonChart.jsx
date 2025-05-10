import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { STAT_LABELS } from '@/constants/statKeys';

export default function StatComparisonChart({ seasonAverages, lastNGamesAvg }) {
  // Define which stats to show in the chart
  const statsToShow = [
    { key: 'pts', label: 'Points' },
    { key: 'reb', label: 'Rebounds' },
    { key: 'ast', label: 'Assists' },
    { key: 'ts', label: 'True Shooting %' },
    { key: 'efg', label: 'Effective FG%' },
    { key: 'ast_to_tov', label: 'AST/TO' },
  ];

  // Transform the data for the chart
  const data = statsToShow.map(({ key, label }) => {
    const seasonValue = seasonAverages[key] || 0;
    const recentValue = lastNGamesAvg[key] || 0;
    
    // Handle percentage fields that come in 0-1 format
    if (key === 'ts' || key === 'efg' || key === 'fgp' || key === 'tpp' || key === 'ftp') {
      return {
        stat: label,
        seasonAvg: Number((seasonValue * 100).toFixed(1)),
        recentAvg: Number((recentValue * 100).toFixed(1)),
      };
    }
    
    return {
      stat: label,
      seasonAvg: Number(seasonValue.toFixed(1)),
      recentAvg: Number(recentValue.toFixed(1)),
    };
  });

  // Custom tooltip formatter for percentage fields
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const isPercentage = label.includes('%');
      return (
        <div className="bg-white p-2 border rounded shadow">
          <p className="font-semibold">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}{isPercentage ? '%' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300} className="px-0 mt-10">
      <BarChart data={data} barGap={4}>
        <XAxis dataKey="stat" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="seasonAvg" fill="#ddd" name="Season Avg" />
        <Bar dataKey="recentAvg" fill="#ff5722" name="Recent Avg" />
      </BarChart>
    </ResponsiveContainer>
  );
}
