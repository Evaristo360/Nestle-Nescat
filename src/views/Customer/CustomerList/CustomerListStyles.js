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
      font: 'normal normal normal 16px Roboto'
    },
    th: {
      textTransform: 'none !important',
      '&.MuiButtonBase-root': {
        textAlign: 'center !important',
        font: 'normal normal medium 140px Roboto !important',
        letterSpacing: '0px !important',
        color: '#4E4E4E',
        opacity: 1,
        background: `${mode !== 'dark'
        ? 'transparent'
        : '#FFFFFF'}`
      }
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
      alignItems: 'left'
    },
    selectConn: {
      width: '8rem'
    },
    image: {
      width: '70px',
      height: '70px'
    },
    usersButton: {
      background: '#1C1C1C 0% 0% no-repeat padding-box',
      boxShadow: '0px 3px 3px #0000001A',
      borderRadius: '4px',
      opacity: '1',
      '&:hover': {
        background: '#1C1C1C',
        opacity: '0.90'
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
    subheader: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100hv'
    },
    legend: {
      justifyContent: 'flex-start',
    },
    buttons: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end'
    },
    iconspace: {
      marginRight: '0.3rem'
    },
    highlight: {
      color: '#007bff',
      cursor: 'pointer', 
      '&:hover': {
        color: '#007bffFA'
      }
    } 
  });

  return useStyles();

};
