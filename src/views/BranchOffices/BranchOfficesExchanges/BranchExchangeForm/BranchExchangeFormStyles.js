import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  subtitle: {
    marginTop:35,
    textAlign: 'left',
    font: 'normal normal normal 21px Roboto',
    letterSpacing: '0px',
    color: '#007CBA',
    opacity: 1
  },
  legend: {
    marginTop: '12px',
    marginBottom: '16px',
    textAlign: 'left',
    font: 'normal normal normal 16px Roboto',
    letterSpacing: '0px',
    color: '#FFFFFF80',
    opacity: 1
  },
  textSearchField: {
    marginTop: '1rem!important',
    '& .MuiAutocomplete-inputRoot ': {
      background: 'rgba(225, 225, 225, 0.15)',
      borderRadius: '5px',
      color: '#FFFFFF',
      padding:15,
      resize:"vertical",
      minHeight:28
    },
    '& .MuiInputLabel-filled.MuiInputLabel-marginDense ':{
      color: '#FFFFFF80'
    },
    '& .MuiAutocomplete-input': {
      color: '#FFFFFF'
    },
    '& .MuiFormHelperText-root': {
      color: '#FFFFFF80'
    }
  },
});
