import { css } from '@emotion/react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';

export const containerUtilStyles = css`
  .between {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .end {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;

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

export const useStyles = makeStyles({
  root: {
    '& .MuiPaper-root': {
      width: '35%',
      background: '#002169',
      padding: '1rem 3rem'
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
    marginTop: '27px',
    textAlign: 'left',
    font: 'normal normal normal 16px Roboto',
    letterSpacing: '0px',
    color: '#FFFFFF80',
    opacity: 1
  },
  rol: {
    marginTop: '5px',
    textAlign: 'right',
    font: 'normal normal normal 16px Roboto',
    letterSpacing: '0px',
    color: '#20B5D3',
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
    font: 'normal normal normal 21px Roboto',
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
  textField: {
    marginTop: '1rem!important',
    '& .MuiInputBase-input': {
      background: 'rgba(225, 225, 225, 0.15)',
      borderRadius: '5px',
      color: '#FFFFFF'
    },
    '& .MuiFormLabel-root': {
      color: '#FFFFFF80'
    },
    '& .MuiFormHelperText-root': {
      color: '#FFFFFF80'
    }
  },
  formGroup: {
    '& .MuiTypography-root': {
      color: '#FFFFFF',
      opacity: 1
    }
  },
  selectScreen: {
    marginTop: '14px'
  },
  avaiableScreen: {
    marginTop: '19px',
    width: '100%'
  },
  tag: {
    textAlign: 'left',
    font: 'normal normal normal 16px Roboto',
    letterSpacing: '0px',
    color: '#FFFFFF',
    opacity: 1
  },
  range: {
    marginTop: '0px'
  },
  priority: {
    marginTop: '24px'
  }
});
