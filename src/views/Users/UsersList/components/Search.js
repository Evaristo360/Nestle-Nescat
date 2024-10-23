import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
//import CssBaseline from '@material-ui/core/CssBaseline';
//import Typography from '@material-ui/core/Typography';
//import Container from '@material-ui/core/Container';
import './Search.css';
import Logousers from './Icon awesome-users.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '400px'
    }
  }
}));

export const Search = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div class="flex-container">
        <div class="gallery">
          <img src={Logousers} alt="Cinque Terre" />
        </div>
        <div class="number-users">
          <div class="users">Usuarios:</div>
          <div class="number">{props.number}</div>
        </div>
        <div class="search">
          <form className={classes.root} noValidate autoComplete="off">
            <TextField id="outlined-basic" label="Buscar" variant="outlined" onChange={props.onChange} />
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
