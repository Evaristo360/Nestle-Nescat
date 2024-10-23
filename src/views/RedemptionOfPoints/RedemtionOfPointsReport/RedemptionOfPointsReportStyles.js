import { useTheme } from 'hooks/useTheme';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  infoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: '2rem'
  },
  text: {
    color: props => props.currentTheme.texts,
    font: 'normal normal normal 12px/16px Roboto'
  },
  contextTd: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    //paddingRight: '2rem!important'
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
  }
});
