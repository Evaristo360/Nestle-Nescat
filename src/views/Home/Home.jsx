import React from 'react';
import { Grid } from '@material-ui/core';
import { Introduction } from 'components/Guideline';
import './Home.scss';

function Home() {
  return (
    <Grid className="home">
      <Introduction />
    </Grid>
  );
}

export { Home };
