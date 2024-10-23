import { css } from "@emotion/react";

export const styles = css`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 14px;
    color: #fff;
    font: normal normal normal 16px Roboto;
    letter-spacing: 0px;
  `;

  export const normalStylesItem = css`
    padding: 0.5rem 0px 0.5px 0px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-right: 50px;

    .point-ext {
      padding: 3px;
      margin-right: 0.5rem;
      width: 20px;
      height: 20px;
      background: transparent;
      border: none;
      border: 2px solid #fff;
      opacity: 0.7;
      border-radius: 50%;

      .point {
        background: transparent;
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }
    }
  `;
  export const selectedStylesItem = css`
    .point-ext {
      border-color: #007CBA;
      .point {
        background: #007CBA;
      }
    }
  `;