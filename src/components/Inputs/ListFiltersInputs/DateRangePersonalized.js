import React, { useState, useEffect } from 'react';
import DateRangeInput from './DateRangeInput';
import { css } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';
import hexToRGB from '../../utils/hexToRBG';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import es from 'date-fns/locale/es'; // the locale you want
import moment from 'moment';

moment.locale();

const DateRangePersonalized = ({ selectionRange, setSelectionRange }) => {
  const { currentTheme } = useTheme();

  const DateRangePersonalizedStyle = css`
    position: relative;
    .icon {
      fill: none;
      stroke: ${currentTheme.titles};
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 2px;
      margin-top: 7px;
      margin-left: 8px;
    }

    #dateRangeStyle {
      display: flex;
      cursor: pointer;
      #inputsDiv {
        display: flex;
        border-bottom: 1px solid ${hexToRGB(currentTheme.titles, 0.5)};
        padding-left: 8px;
        padding-right: 8px;
        #divisor {
          margin-top: 8.5px;
          margin-left: 2px;
          margin-right: 5px;
          color: ${hexToRGB(currentTheme.titles, 0.7)};
        }
      }
      #calendar {
        margin-top: 3px;
        .a {
          fill: none;
          stroke: #009fda;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
      }
    }
    .rdrCalendarWrapper {
      position: absolute;
      z-index: 20000;
    }
    .rdrDateDisplayWrapper {
      display: none;
    }
  `;

  const [openCalendar, setOpenCalendar] = useState(false);

  return (
    <div css={DateRangePersonalizedStyle}>
      <div id="dateRangeStyle" onClick={() => setOpenCalendar(!openCalendar)}>
        <div id="inputsDiv">
          <DateRangeInput
            readOnly
            value={moment(selectionRange[0].startDate).format('DD-MM-YYYY')}
          />
          <p id="divisor">-</p>
          <DateRangeInput
            readOnly
            value={moment(selectionRange[0].endDate).format('DD-MM-YYYY')}
          />
        </div>
        <svg
          className="icon"
          xmlns="http://www.w3.org/2000/svg"
          width="20.36"
          height="22.4"
          viewBox="0 0 20.36 22.4"
        >
          <g transform="translate(-3.5 -2)">
            <path
              className="a"
              d="M6.54,6H20.82a2.04,2.04,0,0,1,2.04,2.04V22.32a2.04,2.04,0,0,1-2.04,2.04H6.54A2.04,2.04,0,0,1,4.5,22.32V8.04A2.04,2.04,0,0,1,6.54,6Z"
              transform="translate(0 -0.96)"
            />
            <path className="a" d="M24,3V7.08" transform="translate(-6.24 0)" />
            <path className="a" d="M12,3V7.08" transform="translate(-2.4 0)" />
            <path
              className="a"
              d="M4.5,15H22.86"
              transform="translate(0 -3.84)"
            />
          </g>
        </svg>
      </div>
      {openCalendar && (
        <DateRange
          locale={es}
          onChange={(e) => setSelectionRange([e.selection])}
          moveRangeOnFirstSelection={false}
          ranges={selectionRange}
        />
      )}
    </div>
  );
};

export default DateRangePersonalized;
