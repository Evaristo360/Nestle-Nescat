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
      textAlign: 'left',
      font: 'normal normal bold 16px Roboto',
      letterSpacing: '0px',
      color: `${mode !== 'dark'
      ? '#63513D'
      : '#FFFFFF'}`,
      opacity: 1,
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
    sb1:{
      '&:before': {
        content: "",
        width: '0px',
        height: '0px',
        position: 'absolute',
        borderLeft: '10px solid #00bfb6',
        bordeRight: '10px solid transparent',
        borderTop: '10px solid #00bfb6',
        borderBottom: '10px solid transparent',
        right: '-19px',
        top: '6px'
      }
    },
    box: {
      width: '300px',
      margin: '50px auto',
      background: '#00bfb6',
      padding: '20px',
      textAlign: 'center',
      fontWeight: '900',
      color: '#fff',
      fontFamily: 'arial',
      position: 'relative'
    },
    bubleProduct: {
      textAlign: 'left',
      font: 'normal normal normal 13px Roboto',
      letterSpacing: '0px',
      color: '#63513D7D',
      opacity: 1
    },
    pz: {
      textAlign: 'left',
      font: 'normal normal bold 16px Roboto',
      letterSpacing: '0px',
      color: '#63513D',
      opacity: 1
    },
    grid: mode !== 'dark' ? "#ffffff" : "#f5f5f5",
    gridd: {
      textAlign: 'left',
      font: 'normal normal bold 16px Roboto',
      letterSpacing: '0px',
      color: '#63513D',
      opacity: 1
    },
    detections: {
      background: '#ffffff',
      boxShadow: '0px 3px 4px #00000024'
    },
    barTitle: {
      textAlign: 'center',
      font: 'normal normal medium 16px/21px Roboto',
      letterSpacing: '0px',
      color: '#63513D',
      opacity: 1
    },
    barLegend: {
      textAlign: 'center',
      font: 'normal normal medium 16px/21px Roboto',
      letterSpacing: '0px',
      color: '#63513D80',
      opacity: 1
    },
    axisLabel: {
      textAlign: 'left',
      font: 'normal normal medium 12px/21px Roboto',
      letterSpacing: '0px',
      color: '#63513D80',
      opacity: 1
    }
  });

  return useStyles();

};
