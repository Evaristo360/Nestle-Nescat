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
  activeLabel: {
    marginLeft: '0.5rem'
  },
  settingsCont: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '50%'
  },
  selectConn: {
    width: '8rem'
  }
});
