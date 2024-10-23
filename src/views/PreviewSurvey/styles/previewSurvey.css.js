import { css } from '@emotion/react';
import { useTheme } from '../../../contexts/themeContext';

export const previewSurveyStyle = () => {
  const { currentTheme } = useTheme();

  return css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4rem 0rem;
    flex-direction: column;

    .sas-survey-preview--container {
      width: 866px;
      border-radius: 10px;
      background: #fff;
    }

    .sas-survey-preview--options {
      display: flex;
      flex-direction: column;
      justify-content: unset;
      align-items: flex-end;
      width: 100%;
      padding: 0 4rem;
      margin-bottom: 1rem;
    }

    .sas-survey-preview--toggle-container {
      display: flex;
      justify-content: center;
      align-items: center;

      p {
        color: ${currentTheme.texts};
      }
    }
  `;
};
