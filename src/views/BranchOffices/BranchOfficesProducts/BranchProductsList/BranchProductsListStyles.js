import { useTheme } from 'hooks/useTheme';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  text: {
    color: props => props.currentTheme.texts,
    font: 'normal normal normal 12px/16px Roboto'
  },
  contextTd: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  activeLabel: {
    marginLeft: '0.5rem'
  },
  infoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: '1rem'
  },
  settingsCont: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%'
  },
  selectConn: {
    width: '8rem'
  }
});
