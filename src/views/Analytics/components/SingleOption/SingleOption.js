import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useTheme } from 'hooks/useTheme';
import { FormattedMessage } from 'react-intl';
import { messages } from '../../messages';
import { Styles } from './SingleOption.css';

export const SingleOption = ({
  type = '',
  data = [],
  totalFound = 0,
  totalTime = 0,
  colors = []
}) => {
  const { currentTheme } = useTheme();
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return type == 'text' ? (
      <text
        id="textID"
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {`${data[index].value} `}
        <FormattedMessage {...messages.times} />
      </text>
    ) : (
      <text
        id="textID"
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div id="pieChartArea" css={Styles}>
      <div id="chartContent" className="left">
        {type == 'text' ? (
          <>
            <h1>
              <FormattedMessage {...messages.campaignsPlays} />
            </h1>
            <div id="subtitle">
              <h2>
                <FormattedMessage {...messages.totalCampaigns} />
              </h2>
              <b>{totalFound}</b>
            </div>
          </>
        ) : (
          <>
            <h1>
              <FormattedMessage {...messages.campaignsTime} />
            </h1>
            <div id="subtitle">
              <h2>
                <FormattedMessage {...messages.totalTimeCampaign} />
              </h2>
              <b>
                {totalTime}
                <FormattedMessage {...messages.segs} />
              </b>
            </div>
          </>
        )}
      </div>

      <div id="pieImage">
        <PieChart width={470} height={340}>
          <Pie
            data={data}
            cx={300}
            cy={160}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={160}
            dataKey="value"
            stroke={currentTheme.background}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
        </PieChart>
        <div id="optionsColors">
          <ul>
            {data.map((ans, index) => (
              <li key={index}>
                <div
                  id="colorCircle"
                  style={{ backgroundColor: colors[index] }}
                ></div>
                {ans.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
