import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  root: {
    '& .MuiPaper-root': {
      width: '23%',
      background: '#212529'
    }
  },
  section: {
    width: '80%',
    marginLeft: '20%'
  },
  containerEnd: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: '1rem',
    marginBottom: '0.8rem'
  },
  buttonClose: {
    background: '#1C1C1C',
    color: 'white'
  },
  poweredBy: {
    color: '#FFFFFF',
    font: 'normal 10px Roboto',
    width: '95%',
    textAlign: 'right',
    marginTop: '1rem',
    marginBottom: '1rem',
  }
});
