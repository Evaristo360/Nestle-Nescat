import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  accordionMainContainer:{
    marginTop:25,
    width: '100%!important',
    border: 'none!important',
    boxShadow:"none!important"
  },
  accordionHeaderContainer:{
    padding:0
  },
  accordionDetailContainer:{
    width: '100%!important',
    display: 'grid!important',
    padding:0
  },
  subtitle: {
    textAlign: 'left',
    font: 'normal normal normal 21px Roboto',
    letterSpacing: '0px',
    color: '#007CBA',
    opacity: 1
  }
});
