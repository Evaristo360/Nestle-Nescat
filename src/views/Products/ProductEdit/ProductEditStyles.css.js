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
    title: {
      marginTop: '27px',
      marginLeft: '0px',
      color: `${mode !== 'dark'
      ? '#FFFFFF'
      : '#007CBA'}`,
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
      '& .MuiFormLabel-root': {
        color: '#FFFFFF80'
      },
      '& .MuiFormHelperText-root': {
        color: '#FFFFFF80'
      }
    },
    description: {
      marginTop: '1rem!important',
      '& .MuiInputBase-root': {
        background: 'rgba(180, 180, 180, 0.15)',
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
    priority: {
      marginTop: '24px'
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
    },
    formControl: {
      background: '#E1E1E126 0% 0% no-repeat padding-box',
      borderRadius: '4px 4px 4px 4px',
      opacity: 1,
      '&.MuiFilledInput-underline, &.Mui-focused': {
        color: '#FFFFFF80',
        opacity: 1
      }
    },
    selectEmpty: {
      //marginTop: theme.spacing(2)
    },
    select: {
      textAlign: 'left',
      font: 'normal normal normal 20px Roboto',
      letterSpacing: '0px',
      color: '#FFFFFF80',
      opacity: 1
    },
  
    inputLabel: {
      textAlign: 'left',
      font: 'normal normal normal 20px Roboto',
      letterSpacing: '0px',
      color: '#FFFFFF80',
      opacity: 1,
      '&.Mui-focused': {
        color: '#FFFFFF80',
        opacity: 1
      }
    },
    // textField: {
    //   //marginLeft: theme.spacing(1),
    //   //smarginRight: theme.spacing(1),
    //   width: 200,
    //   '& .MuiFormHelperText-root': {
    //     textAlign: 'left',
    //     font: 'normal normal normal 16px Roboto',
    //     letterSpacing: '0px',
    //     color: '#FFFFFF',
    //     background: '#FFFFFF',
    //     opacity: 1
    //   },
    // },
    description: {
      // marginLeft: '1rem',
      // marginRight: '1rem',
      // width: 200,
      // '& .MuiFormHelperText-root': {
      //   textAlign: 'left',
      //   font: 'normal normal normal 16px Roboto',
      //   letterSpacing: '0px',
      //   color: '#FFFFFF',
      //   background: '#FFFFFF',
      //   opacity: 1
      // }
      marginTop: '1rem!important',
      '& .MuiInputBase-input': {
        borderRadius: '5px',
        color: '#FFFFFF'
      },
      '& .MuiFormLabel-root': {
        color: '#FFFFFF80',
      },
      '& .MuiFormHelperText-root': {
        color: '#FFFFFF80',
      },
      '& .MuiInputBase-root': {
        color: '#FFFFFF80',
        background: 'rgba(225, 225, 225, 0.15)',
      }
    },
    date: {
      textAlign: 'left',
      font: 'normal normal normal 24px Roboto',
      letterSpacing: '0px',
      color: '#FFFFFF',
      opacity: 1,
      '& .MuiInputLabel-root': {
        textAlign: 'left',
        font: 'normal normal normal 16px Roboto',
        letterSpacing: '0px',
        color: '#FFFFFF',
        opacity: 1
      },
      '& .MuiInputBase-input': {
        textAlign: 'left',
        font: 'normal normal normal 18px Roboto',
        letterSpacing: '0px',
        color: '#FFFFFF',
        opacity: 1
      }
    }
  });  

  return useStyles();

};

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
    '& .MuiFormLabel-root': {
      color: '#FFFFFF80'
    },
    '& .MuiFormHelperText-root': {
      color: '#FFFFFF80'
    }
  },
  description: {
    marginTop: '1rem!important',
    '& .MuiInputBase-root': {
      background: 'rgba(180, 180, 180, 0.15)',
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
  priority: {
    marginTop: '24px'
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
