import { css, jsx } from '@emotion/react';

export const scenesListStyle = ({ currentTheme }) =>
  css`
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

    .restore-container {
      display: inline-block;
      margin-left: 10px;
    }

    .subtitle {
      display: inline-block;
      font: normal normal normal 12px/16px Roboto;
      color: ${currentTheme.texts};
      opacity: 0.5;
      width: 67%;
      height: 27px;
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

    .button {
      cursor: pointer;
      display: inline-block;
      background: ${currentTheme.button};
      color: ${currentTheme.button_Text};
      border-radius: 5px;
      padding: 12px 8px 10px 8px;
      font: normal normal normal 14px/10px Verdana;
      text-align: center;

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

    .filters-col-1,
    .filters-col-2 {
      display: inline-flex;
      width: 50%;
    }

    .filters-col-2 {
      justify-content: flex-end;
    }

    .new-scene-container {
      display: inline-block;
      width: 33%;
      text-align: end;
      padding-right: 15px;
    }

    .new-scene-button {
      width: 180px;
    }

    .filters-container {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-top: 27px;
      padding-right: 15px;
    }

    .status-filter {
      display: inline-block;
      width: 103px;
    }

    .pagination-container {
      align-items: end;
      // margin-top: 85px;
      margin-top: -2.0rem;
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

    .search-container {
      display: inline-block;
      width: 194px;
    }

    .search-button-container {
      display: inline-block;
      margin-left: 5px;
    }

    .search-button {
      width: 92px;
    }

    .date-filter-container {
      display: inline-block;
      width: 195px;
      margin-left: 27px;
    }

    .separator-1 {
      height: 27px;
    }
  `;
