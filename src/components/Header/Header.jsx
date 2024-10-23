import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Language } from '../Language';
import { Theme } from '../Theme';
import { useStyles } from './HeaderStyles';

const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.link}>
              <span role="img" aria-label="rocket">
                🚀 Octopy
              </span>
            </Link>
          </Typography>
          <Language />
          <Theme />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export { Header };
