import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from 'hooks/useTheme';

const useStyles = makeStyles({
  textField: {
    marginTop: '1rem!important',
    '& .MuiInputBase-input': {
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
  },
  title: {
    color: '#FFFFFF',
    font: 'normal normal bold 20px/26px Roboto'
  },
  subLabel: {
    color: '#FFFFFF',
    font: 'normal normal medium 16px/21px Roboto'
  },
  description: {
    color: '#FFFFFF80',
    font: 'normal normal normal 12px/16px Roboto'
  },
  inputCont: { width: '100%' },
  inputHidden: { display: 'none' },
  status_title: {
    color: '#007CBA'
  },
  disable: {
    marginTop: '1rem!important',
    '& .MuiInputBase-input': {
      background: 'rgba(225, 225, 225, 0.05)',
      borderRadius: '5px',
      color: '#FFFFFF'
    },
    '& .MuiFormLabel-root': {
      color: '#FFFFFF80'
    },
    '& .MuiFormHelperText-root': {
      color: '#FFFFFF80'
    }
  }
});

export const useFormStyles = () => {
  const { currentTheme } = useTheme();
  const classes = useStyles({ currentTheme });

  return classes;
};
