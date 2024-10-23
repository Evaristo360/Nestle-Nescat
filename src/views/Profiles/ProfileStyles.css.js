import { css } from '@emotion/react';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from 'hooks/useTheme';

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
    passTextField: {
      marginTop: '0.75rem!important',
      marginBottom: '0.75rem!important',
      '& .MuiInputBase-input': {
        borderRadius: '5px',
        color: '#FFFFFF'
      },
      '& .MuiFormLabel-root': {
        color: '#FFFFFF80'
      },
      '& .MuiFormHelperText-root': {
        color: '#FFFFFF80'
      },
      '& .MuiInputBase-root': { background: 'rgba(225, 225, 225, 0.13)' }
    },
    textField: {
      marginTop: '0.75rem!important',
      marginBottom: '0.75rem!important',
      '& .MuiInputBase-input': {
        background: '#002169 0% 0% no-repeat padding-box',
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
    margin: {
      marginTop: '2rem!important',
      marginBottom: '2rem!important',
      marginLeft: '1rem'
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
    permissions: {
      marginTop: '30px',
      textAlign: 'left',
      font: 'normal normal normal 21px Roboto',
      letterSpacing: '0px',
      color: '#007CBA',
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
    }
  });

  return useStyles();

};

export const useStyles = makeStyles({
  root: {
    '& .MuiPaper-root': {
      width: '35%',
      background: '#002169',
      padding: '1rem 3rem'
    }
  },
  passTextField: {
    marginTop: '0.75rem!important',
    marginBottom: '0.75rem!important',
    '& .MuiInputBase-input': {
      borderRadius: '5px',
      color: '#FFFFFF'
    },
    '& .MuiFormLabel-root': {
      color: '#FFFFFF80'
    },
    '& .MuiFormHelperText-root': {
      color: '#FFFFFF80'
    },
    '& .MuiInputBase-root': { background: 'rgba(225, 225, 225, 0.13)' }
  },
  textField: {
    marginTop: '0.75rem!important',
    marginBottom: '0.75rem!important',
    '& .MuiInputBase-input': {
      background: '#002169 0% 0% no-repeat padding-box',
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
  margin: {
    marginTop: '2rem!important',
    marginBottom: '2rem!important',
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
  permissions: {
    marginTop: '30px',
    textAlign: 'left',
    font: 'normal normal normal 21px Roboto',
    letterSpacing: '0px',
    color: '#007CBA',
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
  }
});
