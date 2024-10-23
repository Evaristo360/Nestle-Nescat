import { css } from '@emotion/react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import { useTheme } from 'hooks/useTheme';

export const style = () => {
  const { currentTheme, mode } = useTheme();

  const useStyles = makeStyles({
    root: {
      '& .MuiPaper-root': {
        width: '35%',
        background: `${mode !== 'dark'
        ? '#002169'
        : '#212529'}`
      }
    },
    title: {
      marginTop: '27px',
      marginLeft: '0px',
      color: '#FFFFFF',
      font: 'normal normal bold 26px Roboto',
      textAlign: 'left',
      letterSpacing: '0px',
      opacity: 1
    },
    subtitle: {
      marginTop: '30px',
      textAlign: 'left',
      font: 'normal normal normal 21px Roboto',
      letterSpacing: '0px',
      color: '#007CBA',
      opacity: 1
    },
    data: {
      marginTop: '30px',
      textAlign: 'left',
      font: 'normal normal normal 21px Roboto',
      letterSpacing: '0px',
      color: '#007CBA',
      opacity: 1
    },
    permissions: {
      marginTop: '30px',
      textAlign: 'left',
      font: 'normal normal normal 19px Roboto',
      letterSpacing: '0px',
      color: '#007CBA',
      opacity: 1
    },
    legend: {
      marginTop: '12px',
      marginBottom: '22px',
      textAlign: 'left',
      font: 'normal normal normal 16px Roboto',
      letterSpacing: '0px',
      color: '#FFFFFF80',
      opacity: 1
    },
    switchLabel: {
      marginTop: '12px',
      marginBottom: '12px',
      textAlign: 'left',
      font: 'normal normal normal 16px Roboto',
      letterSpacing: '0px',
      color: '#FFFFFF80',
      opacity: 1
    },
    pageTiles: {
      color: '#FFFFFF',
      textAlign: 'left',
      font: 'normal normal normal 21px Roboto',
      letterSpacing: '0px',
    },
    itemProductContainer: {
      background: '#FFFFFF1A 0% 0% no-repeat padding-box',
      height: '132px;',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    radioButton: {
      '& .MuiRadio-colorSecondary':{
        color: '#FFFFFF80 !important',
      },
      '& .MuiRadio-colorSecondary.Mui-checked':{
        color: '#007CBA !important',
      },
      '& .MuiFormControlLabel-root':{
        textAlign: 'left',
        letterSpacing: '0px',
        color: '#FFFFFF',
        opacity: 1
      },
      '& .MuiFormControlLabel-label':{
        textAlign: 'left',
        font: 'normal normal normal 16px Roboto',
        letterSpacing: '0px',
        color: '#FFFFFF',
        opacity: 1
      },
    },
  });

  return useStyles();

};

export const SwitchStyle = withStyles({
  /* '& .MuiFormGroup-root':{
    marginTop: '30'
  }, */
  switchBase: {
    color: '#FFFFFF',
    '&$checked': {
      color: '#FFFFFF'
    },
    '&$checked + $track': {
      backgroundColor: '#007CBA',
      opacity: 1
    }
  },
  checked: {},
  track: {
    backgroundColor: '#007CBA',
    opacity: 0.15
  }
})(Switch);
 