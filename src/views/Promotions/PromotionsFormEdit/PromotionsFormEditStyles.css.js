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

    checkBox: {
      '& .MuiCheckbox-colorSecondary':{
        color: '#FFFFFF80 !important',
      },
      '& .MuiCheckbox-colorSecondary.Mui-checked':{
        color: '#007CBA !important',
      },
      '& .MuiFormControlLabel-root':{
        textAlign: 'left',
        font: 'normal normal normal 80px Roboto',
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

    checkBoxSelect: {
      '& .MuiCheckbox-colorSecondary':{
        color: '#222222 !important',
      },
      '& .MuiCheckbox-colorSecondary.Mui-checked':{
        color: '#007CBA !important',
      },
      '& .MuiFormControlLabel-root':{
        textAlign: 'left',
        font: 'normal normal normal 80px Roboto',
        letterSpacing: '0px',
        color: '#FFFFFF',
        opacity: 1
      },
      '& .MuiFormControlLabel-label':{
        textAlign: 'left',
        font: 'normal normal normal 14px Roboto',
        letterSpacing: '0px',
        color: '#FFFFFF',
        opacity: 1
      },
    },

    datePicker: {
      //marginTop: '1rem!important',
      '& .MuiInputBase-input': {
        width: '5rem',
        background: 'rgba(225, 225, 225, 0.15)',
        borderRadius: '5px',
        //color: '#FFFFFF'
        textAlign: 'left',
        font: 'normal normal normal 10px/16px Roboto',
        letterSpacing: '0px',
        color: '#FFFFFF80',
        opacity: 1
      },
      '& .MuiFormLabel-root, & .MuiFormLabel-root.Mui-focused, & .MuiFormLabel-root.Mui-disabled': {
        color: '#FFFFFF80'
      },
      '& .MuiFormHelperText-root': {
        color: '#FFFFFF80'
      }
    },

    formColor: {
      '& .MuiPaper-root':{
        color: '#FFFFFF80 !important',
      }
    },
    
    formControl: {
      background: '#E1E1E126 0% 0% no-repeat padding-box',
      borderRadius: '4px 4px 4px 4px',
      opacity: 1,
      '&.MuiFilledInput-underline, &.Mui-focused': {
        color: '#FFFFFF80',
        opacity: 1
      },
      '&.MuiFormControl-root': {
        width: '100%',
      },
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
    error: {
      marginLeft: '0.5rem',
      textAlign: 'left',
      font: 'normal normal normal 14px Roboto',
      letterSpacing: '0px',
      color: '#FFFFFF80',
      opacity: 1
    },
    textField: {
      marginTop: '1rem!important',
      '& .MuiInputBase-input': {
        background: 'rgba(225, 225, 225, 0.15)',
        borderRadius: '5px',
        color: '#FFFFFF',
        width: '100%',
      },
      '& .MuiFormLabel-root': {
        color: '#FFFFFF80'
      },
      '& .MuiFormHelperText-root': {
        color: '#FFFFFF80'
      },
      '&.MuiFormControl-root': {
        width: '100%',
      },
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

    arrowIcon: {
      color: '#FFFFFF',
    },

    deleteButton: {
      color: '#A50064',
    },

    addButton: {
      color: '#5EC9FF',
    },

    listButtons: {
      width: '100%',
      marginTop: '1.7rem',
      //marginLeft: '12rem',
      paddingRight: '-1rem',
      right: '-1rem',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-end'
    },

    listTitle: {
      width: '100%',
      display: 'flex',
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
