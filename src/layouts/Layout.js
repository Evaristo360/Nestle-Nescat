import React from 'react';
import { css, Global } from '@emotion/react';
import PropTypes from 'prop-types';

const Layout = ({ children }) => (
  <>
    <Global
      styles={css`
        * {
          box-sizing: border-box;
          margin: 0;
        }

        html,
        body {
          margin: 0;
          color: #555;
          font-family: Verdana, -apple-system, BlinkMacSystemFont, 'Segoe UI',
            Roboto, Helvetica, Arial, sans-serif;
          font-size: 18px;
          line-height: 1.4;

          > div {
            margin-top: 0;
          }

          .d-test {
            background: #fff !important;
            color: #ffffff !important;
          }

          .ant-select-item ant-select-item-option {
            color: #fff !important;
          }

          .a-test {
            background: #000000 !important;
          }

          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            color: #ffffff;
            line-height: 1.1;
            margin-bottom: 0;

            + * {
              margin-top: 0.5rem;
            }
          }

          p {
            margin-bottom: 0;
          }

          button {
            line-height: normal;
          }

          strong {
            color: #222;
          }

          figure {
            margin: 0;
          }

          li {
            margin-top: 0.25rem;
          }
        }
        /* width */
        ::-webkit-scrollbar {
          width: 6px;
          height: 5px;
        }

        /* Track */
        ::-webkit-scrollbar-track {
          box-shadow: inset 0 0 5px grey;
          border-radius: 10px;
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
          background: #00ffee;
          border-radius: 10px;
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
          background: #b30000;
        }
        input[type='text'],
        input[type='number'] {
          &:focus,
          &:invalid {
            box-shadow: none;
            outline: none;
          }
          &:invalid {
            border-bottom: 1px solid red !important;
          }
        }
      `}
    />

    <main
      css={css`
        width: 100vw;
        min-height: 100vh;
        overflow-x: hidden;
        display: flex;
        background: #002169;
      `}
    >
      {children}
    </main>
  </>
);

Layout.propTypes = {
  children: PropTypes.object.isRequired
};

export default Layout;
