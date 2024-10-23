import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  root: {
    zIndex: '1000',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    padding: '0.5rem 2.5rem',
    background: ({ currentTheme }) => currentTheme.background
  },
  userSection: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  userCard: {},
  logo: {
    width: '15%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '0.45rem',
    '& img':{
      maxWidth: '100%',
      maxHeight: '2.5rem'
    }
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  userImage: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    overflow: 'hidden',
    background: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& img': {
      width: '100%',
      height: 'auto'
    }
  },
  userName: {
    textAlign: 'right',
    font: 'normal normal normal 16px/21px Roboto',
    color: ({ currentTheme }) => currentTheme.texts
  },
  userButton: {
    minWidth: '50px',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    padding: 0,
    '&.MuiButtonBase-root': {
      padding: 0,
      minWidth: '50px',
      width: '50px'
    }
  },
  smallButton: {}
});
