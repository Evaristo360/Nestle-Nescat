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
  subtitleText: {
    marginTop: '12px',
    textAlign: 'left',
    font: 'normal normal normal 16px Roboto',
    letterSpacing: '0px',
    color: '#ffffff80',
    opacity: 1
  },
  dateCreate: {
    textAlign: 'right',
    font: 'normal normal normal 16px Roboto',
    letterSpacing: '0px',
    color: '#20B5D3',
    opacity: 1
  },
  state: {
    marginTop:"0px",
    textAlign: 'right',
    font: 'normal normal normal 16px Roboto',
    letterSpacing: '0px',
    color: '#ffffff80',
    opacity: 1
  },
  subtitle: {
    textAlign: 'left',
    font: 'normal normal normal 21px Roboto',
    letterSpacing: '0px',
    color: '#007CBA',
    opacity: 1
  },
  permissions: {
    marginTop: '30px',
    textAlign: 'left',
    font: 'normal normal normal 14px Roboto',
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
});

 