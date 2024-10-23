import { css } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';

export const CampaignCreateStyle = () => {
  const { currentTheme } = useTheme();

  return css`
    width: 100%;
    height: 100%;
    border-radius: 8px;
    overflow-y: scroll;
    background: ${currentTheme.background};
    .title {
      color: ${currentTheme.titles};
      font: normal normal bold 25px/33px Roboto;
    }
    .header {
      color: #007cba0d;
      background: #007cba0d;
      padding: 1rem 2.5rem;
    }
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

    .form {
      margin: 12px;
      line-height: 30px;
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
    }

    .emphasis {
      color: ${currentTheme.emphasis};
    }

    .text{      
      color: ${currentTheme.texts}!important;
    }

    .form-control{      
      color: ${currentTheme.texts}!important;
    }
  `;
};
