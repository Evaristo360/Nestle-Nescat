import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

export const CheckBoxStyle = withStyles({
  root: {
    color: '#fff',
    '&$checked': {
      color: '#007CBA'
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

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
    marginTop: '25px',
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
  checkboxLabel: {
    '& .MuiIconButton-root.Mui-disabled':{
      color: '#FFFFFF',
    },
    '& .MuiFormControlLabel-label.Mui-disabled':{
      textAlign: 'left',
      font: 'normal normal normal 18px Roboto',
      letterSpacing: '0px',
      color: '#FFFFFF80',
      opacity: 1
    },
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
  datepicker: {
    marginTop: '1rem!important',
      "& .MuiInputBase-input": {
        padding: '13px 12px',
        background: 'rgba(225, 225, 225, 0.15)',
        borderRadius: '5px',
        color: '#FFFFFF'
      },
      '& .MuiFormLabel-root, & .MuiFormLabel-root.Mui-focused, & .MuiFormLabel-root.Mui-disabled': {
        color: '#FFFFFF80'
      },
      '& .MuiFormHelperText-root': {
        color: '#FFFFFF80'
      }
  }
});