import { css } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';
import hexToRGB from 'components/utils/hexToRBG';

export const CalendarCreateStyle = () => {
  const { mode, currentTheme } = useTheme();

  return css`
    height: 100%;
    .subtitle {
      font: normal normal normal 18px/20px Verdana;
      color: ${currentTheme.texts};
      opacity: 0.5;
      width: 100%;
      height: 27px;
    }

    .content {
      margin: 20px;
      height: calc(100%-43px);
    }

    .col-2 {
      display: flex;
      flex-direction: row;
    }

    .icons {
      margin-top: 0rem;
    }

    .emphasis {
      color: ${currentTheme.emphasis};
    }
    .calendar-month-year {
      margin-top: 0.5rem;
      text-transform: capitalize;
      font-weight: bold;
      color: ${mode == 'dark' ? '#63513D' : currentTheme.texts}!important;
      text-align: left;
      font: normal normal bold 18px Roboto;
      letter-spacing: 0px;
      opacity: 1;
    }
    .event-item {
      background-color: black;
    }
    .rbc-today {
      background-color: ${mode == 'dark' ? '#007CBA0A' : '#f5f5f5'}!important;
      border: '1px solid #8589974D';
    }
    .rbc-header {
      text-transform: uppercase;
      color: '#4E4E4E';
      background-color: ${mode == 'dark' ? '#007CBA0A' : '#f5f5f5'}!important;
      text-align: center;
      font: normal normal bold 16px Roboto;
      letter-spacing: 0px;
    }
    .rbc-day-bg {
      background-color: ${mode == 'dark' ? '#FFFFFF' : '#f5f5f5'};
      border: 1px solid #8589974D;
    }
    .rbc-event {
      background-color: #007CBA0A;
      opacity: 0.5;
    }
    .link-add-event {
      background: #002169 0% 0% no-repeat padding-box;
      border-radius: 4px;
      opacity: 1;
    }
    .today {
      margin-top: -4px;
    }
    .calendarIcon {
      margin-top: 4px;
    }
  `;
};
