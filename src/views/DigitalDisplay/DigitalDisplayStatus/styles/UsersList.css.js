import { css } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';

export const usersListStyle = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { currentTheme } = useTheme();

  return css`
    width: 100%;
    height: 100%;

    h1 {
      font-size: 1.5rem;
      color: ${currentTheme.titles};
    }
    .subtitle {
      font-size: 0.8rem;
      font-weight: 100;
      margin-top: 26.5px;
      color: ${currentTheme.texts};
      opacity: 0.5;
    }

    #cardsArea {
      display: flex;
      padding-top: 0px;
      flex-wrap: wrap;
      cursor: pointer;
    }
  `;
};
