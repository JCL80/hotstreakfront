import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { stat: 'Points', seasonAvg: 28.2, recentAvg: 34.3 },
  { stat: 'Rebounds', seasonAvg: 8.2, recentAvg: 6.5 },
  { stat: 'Assists', seasonAvg: 7.7, recentAvg: 6.0 },
  { stat: 'TS%', seasonAvg: 58.5, recentAvg: 67.9 },
  // Add more if you want
];

export default function StatComparisonChart() {
  return (
    <ResponsiveContainer width="100%" height={300} className="px-0 mt-10">
      <BarChart data={data} barGap={4}>
        <XAxis dataKey="stat" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="seasonAvg" fill="#ddd" name="Season Avg" />
        <Bar dataKey="recentAvg" fill="#ff5722" name="Recent Avg" />
      </BarChart>
    </ResponsiveContainer>
  );
}
