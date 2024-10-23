import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  root: {
    background: '#E9E9F0',
    color: '#63513D80',
    minWidth: '8rem',
    borderRadius:'4px',
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'gray'
    },
    '& .MuiInputLabel-root, & .MuiInputLabel-root.Mui-Focused': {
      color: '#63513D80'
    },
    '& .MuiInputBase-root': {
      height: '2.5rem'
    }
  },
  select: {
    //paddingTop: '0.6rem',
    //paddingBottom: '0.6rem'
  }
});
