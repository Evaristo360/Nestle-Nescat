import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from 'hooks/useTheme';

export const style = () => {
  const { currentTheme, mode } = useTheme();

  const useStyles = makeStyles({
    infoContainer: {
      display: 'flex',
      alignItems: 'flex-start',
      paddingBottom: '2rem'
    },
    text: {
      color: `${mode !== 'dark'
      ? '#63513D82'
      : '#FFFFFF'}`,
      font: 'normal normal normal 12px/16px Roboto'
    },
    contextTd: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      //paddingRight: '2rem!important'
      paddingTop: '3rem!important'
    },
    activeLabel: {
      marginLeft: '0.5rem'
    },
    settingsCont: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'left',
      width: '50%'
    },
    selectConn: {
      width: '8rem'
    },
    image: {
      width: '100%',
      height: 'auto',
      maxWidth: '60px'
    },
    saveButton: {
      background: '#002169',
      boxShadow: '0px 3px 3px #0000001A',
      borderRadius: '4px',
      opacity: '1',
      '&:hover': {
        background: '#002169'
      }
    },
  });

  return useStyles();

};
