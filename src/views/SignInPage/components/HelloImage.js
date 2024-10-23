/* eslint-disable no-unreachable */
import React from 'react';
import helloImg from 'assets/OBJECTS@2x.png';
import { helloImageStyle } from '../styles/helloImage.css';

function HelloImage() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm"></div>
        <div className="col-sm">
          <img style={{ width: '74%' }} src={helloImg} alt="title" />
        </div>
        <div className="col-sm"></div>
      </div>
    </div>
  );

  return (
    <div css={helloImageStyle}>
      <img src={helloImg} alt="hello img" />
    </div>
  );
}

export default HelloImage;
