import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  text: {
    color: props => props.currentTheme.texts,
    font: 'normal normal normal 12px/16px Roboto'
  },
  mainButton: {
    background: '#002169',
    boxShadow: '0px 3px 3px #0000001A',
    borderRadius: '4px',
    opacity: '1',
    '&:hover': {
      background: '#002169'
    }
  },
  downloadButton: {
    marginTop: '0.5rem',
    background: '#007CBA 0% 0% no-repeat padding-box',
    boxShadow: '0px 3px 3px #0000001A',
    borderRadius: '4px',
    opacity: '1',
    '&:hover': {
      background: '#007CBA',
      opacity: '0.90'
    }
  },
  image: {
    width: '100%',
    height: 'auto',
    maxWidth: '60px',
    cursor: 'pointer',
  },
});
