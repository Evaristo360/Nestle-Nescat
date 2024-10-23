import { ResponsiveContainer, PieChart, Pie, Legend, Tooltip, Cell } from "recharts";

const COLORS = ['#63513D', '#F2C043'];

export const PieChartGender =({ data })=> {
  return (
    <ResponsiveContainer width={"100%"} height={150 * data.length} debounce={50}>
      <PieChart>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data}
          cx={"50%"}
          cy={"50%"}
          outerRadius={100}
          fill="#8884d8"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend/>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
