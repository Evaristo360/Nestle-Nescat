import { css } from '@emotion/react';

const styles = () => css`
  .flex {
    display: flex;
    &.start {
      justify-content: flex-start;
      align-items: center;
    }
    &.end {
      justify-content: flex-end;
      align-items: center;
    }
    &.center {
      justify-content: center;
      align-items: center;
    }
    &.around {
      justify-content: space-around;
      align-items: center;
    }
    &.between {
      justify-content: space-between;
      align-items: center;
    }
    &.fd-column {
      flex-direction: column;
    }
    &.fd-row {
      flex-direction: row;
    }
  }
  .nobot-row {
    padding-left: 24px;
    padding-right: 34px;
  }
`;

export default styles;
