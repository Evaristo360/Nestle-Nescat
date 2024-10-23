import React from 'react';
import { css } from '@emotion/react';
import PriorityIcon from 'assets/events/priority.svg';
import MonitorIcon from 'assets/events/monitor.svg';
import ShowIcon from 'assets/events/show.svg';
import { useTheme } from 'hooks/useTheme';

export const EventItem = (event) => {
  const { currentTheme } = useTheme();

  return (
    <div
      css={css`
        padding: 2px;
      `}
    >
      {event.priority ? (
        <img src={PriorityIcon} alt="Evento con prioridad" />
      ) : event.custom ? (
        <img src={MonitorIcon} alt="Evento con intervalo de fecha" />
      ) : (
        <img src={ShowIcon} alt="Evento con con duración siempre" />
      )}
    </div>
  );
};
