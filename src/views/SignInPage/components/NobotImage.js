import React from 'react';
import nobotImg from 'assets/bot.png';
import { nobotImageStyle } from '../styles';

function NobotImage() {
  return (
    <div css={nobotImageStyle}>
      <img src={nobotImg} alt="nobot img" />
    </div>
  );
}

export default NobotImage;
