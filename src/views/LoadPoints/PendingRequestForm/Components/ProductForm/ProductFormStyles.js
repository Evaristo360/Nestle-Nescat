import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  textField: {
    marginTop: '1rem!important',
    width: '100%',
    '& .MuiInputBase-input': {
      background: 'rgba(225, 225, 225, 0.15)',
      borderRadius: '5px',
      color: '#63513D'
    },
    '& .MuiFormLabel-root, & .MuiFormLabel-root.Mui-focused, & .MuiFormLabel-root.Mui-disabled': {
      color: '#63513D80'
    },
    '& .MuiFormHelperText-root': {
      color: '#63513D80'
    },
    '& input[type="number"]:invalid':{
      borderBottom:'none'
    }
  },
});