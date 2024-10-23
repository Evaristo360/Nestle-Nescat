import { css, jsx } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';
import { makeStyles } from '@material-ui/core/styles';

export const ResolutionsListStyle = () => {
  const { currentTheme } = useTheme();

  return css`
    width: 100%;
    overflow: visible;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 21px;
    flex-wrap: wrap;

    .content {
      width: 100%;
      padding-left: 24px;
      margin-top: 10px;
      padding-right: 60px;
    }

    .subtitle {
      display: inline-block;
      font: normal normal normal 12px/16px Roboto;
      color: ${currentTheme.texts};
      opacity: 0.5;
      width: 67%;
      height: 27px;
    }

    .new-resolution-container {
      display: inline-block;
      width: 33%;
      text-align: end;
      padding-right: 36px;
    }

    .new-resolution-button {
      display: inline-block;
      background: ${currentTheme.button};
      color: ${currentTheme.button_Text};
      border-radius: 5px;
      width: 140px;
      padding: 12px 8px 10px 8px;
      text-align: center;
      font: normal normal bold 12px/14px Roboto;
      letter-spacing: 0.01px;

      .add-icon-container {
        display: inline-block;
        margin-right: 8px;
      }

      .add-icon {
        fill: ${currentTheme.button_Text};
      }

      :hover {
        background: ${currentTheme.active_button};
        color: ${currentTheme.active_button_Text};

        .add-icon {
          fill: ${currentTheme.active_button_Text};
        }
      }
    }

    .status-filter-container {
      margin-top: 26px;
      padding-right: 36px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    .status-filter {
      display: inline-block;
      width: 103px;
    }

    .pagination-container {
      align-items: end;
      // margin-top: 85px;
      margin-top: -2rem;
    }

    .pages-info {
      font: normal normal normal 10px/12px Verdana;
      color: ${currentTheme.texts};
      opacity: 0.5;
    }

    .restore-container {
      display: inline-block;
      margin-left: 10px;
    }

    .restore-button {
      display: inline-block;
      background: ${currentTheme.button};
      color: ${currentTheme.button_Text};
      border-radius: 5px;
      width: 90px;
      padding: 12px 8px 10px 8px;
      font: normal normal normal 14px/10px Verdana;
      text-align: center;
      cursor: pointer;
      :hover {
        background: ${currentTheme.active_button};
        color: ${currentTheme.active_button_Text};
      }
    }
  `;
};

export const useStyles = makeStyles({
  infoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: '2rem'
  },
  text: {
    color: props => props.currentTheme.texts,
    font: 'normal normal normal 12px/16px Roboto'
  },
  contextTd: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: '2rem!important'
  },
  activeLabel: {
    marginLeft: '0.5rem'
  },
  settingsCont: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  selectConn: {
    width: '8rem'
  },
  centerCont: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  lblPosition: {
  //   color: props => props.currentTheme.titles,
    '&.MuiInputLabel-outlined.MuiInputLabel-shrink':{
      transform: "translate(14px, 6px) scale(0.75)",
      // color: props => props.currentTheme.titles
    }
  },

  textPosition: {
    '& .MuiSelect-outlined.MuiSelect-outlined':{
      transform: "translate(-14px, 6px) scale(0.75)"
    },
  }
});
