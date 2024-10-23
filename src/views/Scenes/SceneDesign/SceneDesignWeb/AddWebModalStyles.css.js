import { css } from '@emotion/react';
import hexToRGB from 'components/utils/hexToRBG';
import { makeStyles } from '@material-ui/core/styles';

export const useWebModalStyles = makeStyles({
  root: {
    padding: '2rem'
  },
  checkboxCont: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: '1rem'
  }
});

export const AddWebModalStyles = ({ currentTheme }) => css`
  h1 {
    color: ${currentTheme.titles};
    font: normal normal bold 25px/30px Verdana;
  }
  #warning {
    font: normal normal normal 10px/12px Verdana;
    color: ${currentTheme.titles};
    margin-top: 6px;
  }
  .field {
    width: 496px;
    margin-top: 20px;
    p {
      color: ${currentTheme.texts};
      font: normal normal normal 12px/15px Verdana;
    }
    .short {
      width: 331px;
    }
    .large {
      width: 441.5px;
    }
    input {
      margin-top: 8px;
      border: none;
      padding-bottom: 7px;
      background-image: none;
      font-size: 12px;
      background-color: transparent;
      border-bottom: 1px;
      border-bottom-style: solid;
      border-bottom-color: #00ffee;
      width: 100%;
      padding-bottom: 12px;
      color: ${currentTheme.texts};
    }
    label {
      margin-left: -5px;
      font: normal normal normal 12px/15px Verdana;
      color: ${hexToRGB(currentTheme.texts, 0.25)};
    }
    #firstInp {
      margin-bottom: 10px;
    }
    #fieldDes {
      font: normal normal normal 10px/12px Verdana;
      color: ${hexToRGB(currentTheme.texts, 0.25)};
      margin-top: 6px;
    }
    p {
      margin-bottom: 20px;
    }
  }
  #bottomBtn {
    margin-top: 30px;
    display: flex;
    padding-right: 30px;
    button {
      margin-right: 30px;
    }
  }
`;
