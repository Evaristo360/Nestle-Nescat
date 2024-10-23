import React, { useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Legend, Tooltip, Cell, Label } from "recharts";

const COLORS = ['#75D1FF', '#00AAFF', '#007CBA', '#005782', '#002F47'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomLabel = ({ viewBox, total}) => {
  const { cx, cy } = viewBox;
  return (
    <>
      <text
        x={cx}
        y={cy - 50}
        fill="#63513D"
        className="recharts-text recharts-label"
        textAnchor="middle"
        dominantBaseline="central"
      >
        <tspan alignmentBaseline="middle" fontSize="21">
          Total de interacciones
        </tspan>
      </text>
      <text
        x={cx}
        y={cy - 15}
        fill="#63513D"
        className="recharts-text recharts-label"
        textAnchor="middle"
        dominantBaseline="central"
      >
        <tspan alignmentBaseline="middle" fontSize="33">
          {total}
        </tspan>
      </text>
    </>
  );
};

export const PieChartYears =({ data })=> {
  let totalInteractions = 0;
  for( let i = 0; i<data.length; i++ ){
    totalInteractions+=data[i].value;
  }
  
  return (
    
    <ResponsiveContainer width={"100%"} height={60 * data.length} debounce={50}>
      <PieChart>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data}
          cx={"50%"}
          cy={"100%"}
          labelLine={false}
          label={renderCustomizedLabel}
          startAngle={180}
          endAngle={0}
          innerRadius={150} outerRadius={250} 
          fill="#8884d8"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          <Label content={<CustomLabel total = { totalInteractions }/>} position="center" />
        </Pie>
        
        <Legend layout="vertical" verticalAlign="center" align="right" />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
    
  );
}
