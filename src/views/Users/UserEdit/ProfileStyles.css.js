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
        : '#212529'}`,
        padding: '1rem 3rem'
      }
    },
    error: {
      marginLeft: '0.5rem',
      textAlign: 'left',
      font: 'normal normal normal 14px Roboto',
      letterSpacing: '0px',
      color: '#FFFFFF80',
      opacity: 1
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
      marginTop: '12px',
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
      '& .MuiFormLabel-root, & .MuiFormLabel-root.Mui-focused, & .MuiFormLabel-root.Mui-disabled': {
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
    generatePass: {
      color: '#FFFFFFFF',
      backgroundColor: '#0021690F',
      borderStyle: 'none'
    },
    saveButton: {
      background: '#007CBA 0% 0% no-repeat padding-box',
      boxShadow: '0px 3px 3px #0000001A',
      borderRadius: '4px',
      opacity: '1',
      '&:hover': {
        background: '#002169'
      }
    },
    cancelButton: {
      marginLeft: '1rem',
      background: '#1C1C1C 0% 0% no-repeat padding-box',
      boxShadow: '0px 3px 3px #0000001A',
      borderRadius: '4px',
      '&:hover': {
        background: '#222222 0% 0% no-repeat padding-box'
      }
    }
  });

  return useStyles();

};

export const buttonStyles = () => {
  const { currentTheme, mode } = useTheme();

  const style = css`
    background: ${mode !== 'dark'
    ? '#002169'
    : '#212529'};
    color: #FFFFFFFF;
    padding: 0.5rem 1.5rem;
    border: none;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 5px;
    font-size: 14px;
    outline: none;
    &:focus {
      outline: none;
      box-shadow: none;
    }
    &:hover {
      background: ${mode !== 'dark'
      ? '#00216980'
      : '#21252980'};
      color: #FFFFFFFF;
    }`;

  return style;

};

// export const buttonStyles = css`
//   background: #002169;
//   color: #FFFFFFFF;
//   padding: 0.5rem 1.5rem;
//   border: none;
//   box-shadow: 0px 3px 6px #00000029;
//   border-radius: 5px;
//   font-size: 14px;
//   outline: none;
//   &:focus {
//     outline: none;
//     box-shadow: none;
//   }
//   &:hover {
//     background: #00216980;
//     color: #FFFFFFFF;
//   }
// `;

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
    marginTop: '12px',
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
    '& .MuiFormLabel-root, & .MuiFormLabel-root.Mui-focused, & .MuiFormLabel-root.Mui-disabled': {
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
  generatePass: {
    color: '#FFFFFFFF',
    backgroundColor: '#0021690F',
    borderStyle: 'none'
  },
  saveButton: {
    background: '#007CBA 0% 0% no-repeat padding-box',
    boxShadow: '0px 3px 3px #0000001A',
    borderRadius: '4px',
    opacity: '1',
    '&:hover': {
      background: '#002169'
    }
  },
  cancelButton: {
    marginLeft: '1rem',
    background: '#1C1C1C 0% 0% no-repeat padding-box',
    boxShadow: '0px 3px 3px #0000001A',
    borderRadius: '4px',
    '&:hover': {
      background: '#222222 0% 0% no-repeat padding-box'
    }
  }
});
