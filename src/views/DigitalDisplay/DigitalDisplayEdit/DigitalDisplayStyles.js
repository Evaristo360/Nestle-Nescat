import { css } from '@emotion/react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';

export const SwitchStyle = withStyles({
  /* '& .MuiFormGroup-root':{
    marginTop: '30'
  }, */
  switchBase: {
    color: '#FFFFFF',
    '&$checked': {
      color: '#FFFFFF'
    },
    '&$checked + $track': {
      backgroundColor: '#007CBA',
      opacity: 1
    }
  },
  checked: {},
  track: {
    backgroundColor: '#007CBA',
    opacity: 0.15
  }
})(Switch);

export const useStyles = makeStyles({
  title: {
    marginTop: '27px',
    marginLeft: '0px',
    color: '#FFFFFF',
    font: 'normal normal bold 26px Roboto',
    textAlign: 'left',
    letterSpacing: '0px',
    opacity: 1
  },
  subtitle: {
    marginTop: '30px',
    textAlign: 'left',
    font: 'normal normal normal 21px Roboto',
    letterSpacing: '0px',
    color: '#007CBA',
    opacity: 1
  },
  data: {
    marginTop: '30px',
    textAlign: 'left',
    font: 'normal normal normal 21px Roboto',
    letterSpacing: '0px',
    color: '#007CBA',
    opacity: 1
  },
  permissions: {
    marginTop: '30px',
    textAlign: 'left',
    font: 'normal normal normal 19px Roboto',
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
  switchLabel: {
    marginTop: '12px',
    marginBottom: '12px',
    textAlign: 'left',
    font: 'normal normal normal 16px Roboto',
    letterSpacing: '0px',
    color: '#FFFFFF80',
    opacity: 1
  },
  pagesTitle: {
    textAlign: 'left',
    font: 'normal normal normal 21px Roboto',
    letterSpacing: '0px',
    color: '#FFFFFF',
    opacity: 1
  },
  button: {
    '&.MuiButton-root':{
      backgroundColor: '#007CBA',
      color: 'white',
      textTransform: 'inherit',
      '&:hover':{
        backgroundColor: '#007CBAE6!important'
      }
    }
  }
});

 