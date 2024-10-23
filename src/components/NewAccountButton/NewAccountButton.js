import React, { useState, useEffect, useRef } from 'react';
import {
  button,
  buttonUser,
  buttonArea,
  buttonAreaUser
} from '../styles/NewAccountButton.css';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { messages } from './messages';
import { Profile } from 'views/Users/UserCreate';

const NewAccountButton = (props) => {
  return (
    <>
      {props.type === 'user' ? (
        <div css={buttonAreaUser()} onClick={props.onClick}>
          <div css={buttonUser()}>
            <svg
              className="user-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 25.403 25.833"
            >
              <g transform="translate(1 1)">
                <path
                  className="a"
                  d="M29.4,31.276V28.351A5.851,5.851,0,0,0,23.553,22.5h-11.7A5.851,5.851,0,0,0,6,28.351v2.925"
                  transform="translate(-6 -7.443)"
                />
                <path
                  className="a"
                  d="M23.7,10.351A5.851,5.851,0,1,1,17.851,4.5,5.851,5.851,0,0,1,23.7,10.351Z"
                  transform="translate(-6.149 -4.5)"
                />
              </g>
            </svg>
            <p>
              <FormattedMessage {...messages.newUser} />{' '}
            </p>
          </div>
        </div>
      ) : (
        <Link css={buttonArea()} to="/client/create">
          <div css={button()}>
            <svg
              className="client-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="20"
              viewBox="0 0 25.75 20.25"
            >
              <path
                className="a"
                d="M22.688,2.25H2.063A2.063,2.063,0,0,0,0,4.313V19.438A2.063,2.063,0,0,0,2.063,21.5H22.688a2.063,2.063,0,0,0,2.063-2.062V4.313A2.063,2.063,0,0,0,22.688,2.25ZM7.563,6.375a2.75,2.75,0,1,1-2.75,2.75A2.753,2.753,0,0,1,7.563,6.375ZM12.375,16.55a.9.9,0,0,1-.963.825h-7.7a.9.9,0,0,1-.962-.825v-.825A2.706,2.706,0,0,1,5.638,13.25h.215a4.426,4.426,0,0,0,3.42,0h.215a2.706,2.706,0,0,1,2.887,2.475ZM22,14.281a.345.345,0,0,1-.344.344H15.469a.345.345,0,0,1-.344-.344v-.687a.345.345,0,0,1,.344-.344h6.187a.345.345,0,0,1,.344.344Zm0-2.75a.345.345,0,0,1-.344.344H15.469a.345.345,0,0,1-.344-.344v-.687a.345.345,0,0,1,.344-.344h6.187a.345.345,0,0,1,.344.344Zm0-2.75a.345.345,0,0,1-.344.344H15.469a.345.345,0,0,1-.344-.344V8.094a.345.345,0,0,1,.344-.344h6.187A.345.345,0,0,1,22,8.094Z"
                transform="translate(0.5 -1.75)"
              />
            </svg>
            <p>
              <FormattedMessage {...messages.createAccount} />
            </p>
          </div>
        </Link>
      )}
    </>
  );
};

export default NewAccountButton;
