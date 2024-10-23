import React from 'react';
import moment from 'moment';

export const AnalyticsItem = ({ properties }) => {
  moment.locale();

  return (
    <tr className="inside">
      <td className="iniHead">{properties.screen}</td>
      <td>{properties.name}</td>
      <td>{properties.plays}</td>
      <td>{properties.time * 0.001}</td>
    </tr>
  );
};
