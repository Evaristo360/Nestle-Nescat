import React, { useState } from 'react';
import { useStyles } from './CardInfoStyles';
import { useTheme } from 'hooks/useTheme';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

export const CardInfo = ({
  icon,
  title,
  total,
  totalTitle,
  totalLast,
  totalLastTitle,
}) => {
  const { currentTheme } = useTheme();
  const classes = useStyles({currentTheme});

  return (
    <Card elevation={3}>
      <CardContent className={classes.cardContainer}>
        {icon ? <img src={icon} alt={title} className={classes.iconStyle}/> : null}
        <p className={classes.textTitle}>{title}</p>
        {totalLast 
        ?
          <Grid container alignItems="center" >
            <Grid item xs style={{ borderRight:"3px solid #42414D1C" }}>
              <p className={classes.textTotalTitle}>{totalTitle}</p>
              <p className={classes.textTotal}>{total}</p>
            </Grid>
            <Grid item xs style={{ marginLeft:30 }}>
              <p className={classes.textLastTitle}>{totalLastTitle}</p>
              <p className={classes.textLastTotal}>{totalLast}</p>
            </Grid>
            <Grid item xs ></Grid>
          </Grid>
        :
          <Grid container alignItems="center" >
            <Grid item xs>
              <p className={classes.textTotal} style={{ marginTop:10 }}>{total}</p>
            </Grid>
          </Grid>
        }
      </CardContent>
    </Card>
  );
};
