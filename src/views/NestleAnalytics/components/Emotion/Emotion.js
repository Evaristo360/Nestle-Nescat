import React, { useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Label, Cell } from "recharts";

export const Emotion = ({ title, img, value, total }) => {
  const data = [
    { name: title, value: value },
    { name: "total", value: total - value } // se resta el valor para que solo quede el total de datos pendientes
  ];
  const [isActive, setIsActive] = useState(false);


  const CustomLabel = ({ 
    viewBox, 
    value1, 
    value2
   }) => {
    const { cx, cy } = viewBox;
    let percentage = (value2 * 100) / total;
    return (
      <>
        <text
          x={cx}
          y={cy - 5}
          fill="#63513D"
          className="recharts-text recharts-label"
          textAnchor="middle"
          dominantBaseline="central"
        >
          <tspan alignmentBaseline="middle" fontSize="21">
            {value1}
          </tspan>
        </text>
        <text
          x={cx}
          y={cy + 20}
          fill="#63513D"
          className="recharts-text recharts-label"
          textAnchor="middle"
          dominantBaseline="central"
        >
          <tspan alignmentBaseline="middle" fontSize="33">
            {percentage.toFixed(0)}%
          </tspan>
        </text>
      </>
    );
  }

  const CustomImage = ({ 
    viewBox, 
    imageEmotion
   }) => {
    const { cx, cy } = viewBox;
    return (
    <svg  x={cx - (title==="Neutral" ? 135 : 130)} y={cy - (title==="Enojo" || title==="Tristeza" ? 120 : 125)} width="260px" height="260px"  >  
      <image width="260" height="260"
        href={imageEmotion} />
    </svg>
    );
  }


  


  return (
    <ResponsiveContainer width={"100%"} height={150 * data.length} debounce={50}>
      <PieChart 
          onMouseEnter={()=>setIsActive(true)} 
          onMouseLeave={()=>setIsActive(false)}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          dataKey="value"
          innerRadius={110}
          outerRadius={130}
        >
          {data.map((entry, index) => {
            if (index === 1) {
              return (
                <Cell key={`cell-${index}`} fill="#E1E1E14D"  />
              );
            }
            return <Cell key={`cell-${index}`} fill="#EBB34D" cornerRadius={10}/>;
          })}
          <Label
            width={30}
            position="center"
            content={
              isActive ? (
                <CustomLabel value1={title} value2={value} />
              ) : <CustomImage imageEmotion={img}/>
            }
          ></Label>
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
