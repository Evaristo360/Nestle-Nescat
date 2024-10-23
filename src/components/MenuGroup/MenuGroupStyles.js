import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop: '1rem',
    paddingLeft: '20%'
  },
  groupName: {
    width: '100%',
    color: '#63513D73',
    marginBottom: '1rem',
    textTransform: 'uppercase',
    font: 'normal normal bold 12px/16px Roboto'
  },
  link: {
    width: '100%',
    paddingLeft: '0.5rem',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: '0.4rem',
    paddingBottom: '0.4rem',
    '&:hover': {
      textDecoration: 'none'
    },
    '& p': {
      '&:hover': {
        color: '#FFFFFF'
      },
      font: 'normal normal bold 12px/16px Roboto',
      color: '#FFFFFF33',
      marginBottom: 0
    }
  },
  linkActive: {
    background: '#63513D14',
    '& p': {
      color: '#FFFFFF'
    }
  },
  iconContainer: {
    width: 35,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    marginLeft: '0.3rem',
    marginRight: '0.3rem'
  }
});
