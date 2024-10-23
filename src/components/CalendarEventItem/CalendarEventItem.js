import React from 'react';
import { css } from '@emotion/react';
import PriorityIcon from 'assets/events/priority.svg';
import MonitorIcon from 'assets/events/monitor.svg';
import ShowIcon from 'assets/events/show.svg';
import { useStyles } from './CalendarEventItemStyles';

export const CalendarEventItem = ({ date, resource = {} }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {resource.priority ? (
        <img src={PriorityIcon} alt="Evento con prioridad" />
      ) : resource.custom ? (
        <img src={MonitorIcon} alt="Evento con intervalo de fecha" />
      ) : (
        <img src={ShowIcon} alt="Evento con con duración siempre" />
      )}
    </div>
  );
};
