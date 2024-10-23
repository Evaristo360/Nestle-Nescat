import React from 'react';
import { css } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';

const TimeInputCalendar = ({ name, value, ...otherProps }) => {
  const { currentTheme } = useTheme();
  const styles = css`
    font: normal normal normal 12px/15px Verdana;
    font-size: 15px;
    background: ${currentTheme.background};
    cursor: pointer;
    border: none;
    border-bottom: 1px solid ${currentTheme.emphasis};
    border-radius: 0px;
    &:focus {
      border-bottom: 1px solid ${currentTheme.emphasis};
      background: ${currentTheme.background};
      box-shadow: none;
      outline: none;
      opacity: 1;
      color: ${currentTheme.texts};
    }
    &:invalid {
      box-shadow: none;
      outline: none;
      opacity: 1;
    }
    text-align: left;
    font: normal normal normal 16px Roboto;
    letter-spacing: 0px;
    color: #FFFFFFFF;
    background: #E1E1E10A 0% 0% no-repeat padding-box;
    border-radius: 5px;
    height: 40px;
  `;

  return (
    <input type="time" name={name} value={value} {...otherProps} css={styles} />
  );
};

export default TimeInputCalendar;