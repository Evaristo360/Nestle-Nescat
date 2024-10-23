import React from 'react';
import { Button } from '@material-ui/core';
import { Screens } from 'assets';
import { style } from './OrderByButtonStyles';

const OrderByButton = ({ onClick, children, onlyButton=false, styleButton, disable=false }) => {
  const classes = style();

  return (
    <div>
      {onlyButton ? (
        <Button onClick={onClick} className={styleButton} disabled={disable}>
          <span>{children}</span>
        </Button>
      ) : (
        <Button onClick={onClick} className={classes.root}>
          <img
            src={Screens.ScreenOrderIcon}
            alt="Order by"
            style={{ marginRight: '0.5rem' }}
          />
          <span className={classes.text}>{children}</span>
        </Button>
      )}
    </div>
  );
};

export { OrderByButton };
