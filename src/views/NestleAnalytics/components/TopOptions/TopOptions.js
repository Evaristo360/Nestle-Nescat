import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  Text,
  Tooltip
} from "recharts";

const dummy = [
  { name: "Page A", pv: 240 },
  { name: "B", pv: 2210 },
  { name: "C", pv: 2300 },
  { name: "Page D", pv: 2000 },
  { name: "Zero", pv: 0 },
  { name: "Hi", pv: 123 },
  { name: "Bye", pv: 2091 }
];

const YAxisLeftTick = ({ y, payload: { value } }) => {
  return (
    <Text x={100} y={y} textAnchor="end" width={200}  verticalAnchor="middle" fontSize={10} color={"#63513D"} >
      {value}
    </Text>
  );
};

let ctx;

export const measureText14HelveticaNeue = text => {
  if (!ctx) {
    ctx = document.createElement("canvas").getContext("2d");
    ctx.font = "14px 'Roboto";
  }

  return ctx.measureText(text).width;
};

const BAR_AXIS_SPACE = 10;

export const TopOptions = ({data = dummy, xKey="name", yKey="total", color = "#007CBA"}) => {
  const maxTextWidth = useMemo(
    () =>
      data.reduce((acc, cur) => {
        const value = cur[yKey];
        const width = measureText14HelveticaNeue(value.toLocaleString());
        if (width > acc) {
          return width;
        }
        return acc;
      }, 0),
    [data, yKey]
  );

  return (
    <ResponsiveContainer width={"100%"} height={50 * data.length} debounce={50}>
    <BarChart
      data={data}
      layout="vertical"
      margin={{ left: 50, right: maxTextWidth + (BAR_AXIS_SPACE - 8) }}
    >
      <Tooltip/>
      <XAxis hide axisLine={false} type="number" />
      <YAxis
        yAxisId={0}
        dataKey={xKey}
        type="category"
        axisLine={false}
        // tick={{
        //   fontSize:10
        // }}
        tickLine={false}
        tick={YAxisLeftTick}
      />
      <YAxis
        orientation="right"
        yAxisId={1}
        dataKey={yKey}
        type="category"
        axisLine={false}
        tickLine={false}
        tickFormatter={value => value.toLocaleString()}
        mirror
        tick={{
          transform: `translate(${maxTextWidth + BAR_AXIS_SPACE}, 0)`
        }}
      />
      <Bar dataKey={yKey} minPointSize={2} barSize={20}>
        {data.map((d, idx) => {
          return <Cell key={d[xKey]} fill={color} />;
        })}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
  );
};
