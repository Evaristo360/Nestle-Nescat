import { makeStyles } from '@material-ui/core';
import { useTheme } from 'hooks/useTheme';

export const style = () => {
  const { currentTheme, mode } = useTheme();

  const useStyles = makeStyles({
    root: {
      padding: 0,
      '&:hover': {
        background: 'transparent'
      },
      '&:active, &:focus': {
        outline: 'none'
      },
      '& .MuiButton-label': {
        background: `${mode !== 'dark'
        ? '#007cba0a'
        : '#FFFFFF'}`,
      }
    },
    text: {
      textTransform: 'none'
    }
  });

  return useStyles();

};

export const useStyles = makeStyles({
  root: {
    padding: 0,
    '&:hover': {
      background: 'transparent'
    },
    '&:active, &:focus': {
      outline: 'none'
    },
    '& .MuiButton-label': {
      background: '#007cba0a'
    }
  },
  text: {
    textTransform: 'capitalize'
  }
});
