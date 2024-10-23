/* eslint-disable react-hooks/rules-of-hooks */
import { css } from '@emotion/react';
import { useTheme } from 'hooks/useTheme';
import { makeStyles } from '@material-ui/core/styles';

export const modalStyle = () => {
    const { currentTheme } = useTheme();

  return css``;
};

// export const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     backgroundColor: '#FFFFFF',
//     width: '100%',
//     padding: '1rem',
//   },
//   'MuiAppBar-colorPrimary': {
//       backgroundColor: '#FFFFFF'
//   }
// }));

export const style = () => {
  const { currentTheme, mode } = useTheme();

  const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      backgroundColor: `${mode !== 'dark'
      ? '#FFFFFF'
      : '#002169'}`,
      width: '100%',
      padding: '1rem',
    // '& .MuiAppBar-root': {
    //     backgroundColor: '#000000 !important',
    //     background: '#000000 !important',
    // },
    '& .MuiAppBar-colorPrimary': {
      backgroundColor: `${mode !== 'dark'
      ? '#FFFFFF !important'
      : '#002169 !important'}`,
      color: `${mode !== 'dark'
      ? '#002169 !important'
      : '#FFFFFF !important'}`,
      //borderBottom: '2px solid #FFFFFF'
      // background: '#000000 !important',
    },
    '& .MuiTabs-flexContainer': {
      borderBottom: `${mode !== 'dark'
      ? '2px solid #5050500F'
      : '2px solid #FFFFFF'}`
      // background: '#000000 !important',
    },
  //   '& .MuiTabs-flexContainer': {
  //     backgroundColor: '#000000 !important',
  //     background: '#000000 !important',
  // },
    '& .MuiButtonBase-root': {
      // background: '#000000 !important',
      backgroundColor: `${mode !== 'dark'
      ? '#FFFFFF !important'
      : '#002169 !important'}`,
      // color: `${mode !== 'dark'
      // ? '#002169 !important'
      // : '#FFFFFF !important'}`,
    },
    '& .MuiTab-textColorPrimary': {
      color: `${mode !== 'dark'
      ? '#505050 !important'
      : '#007CBA !important'}`
    },
    '& .MuiTab-textColorPrimary.Mui-selected': {
      color: `${mode !== 'dark'
      ? '#002169 !important'
      : '#FFFFFF !important'}`
    },
    '& .MuiTab-root.Mui-selected': {
      color: `${mode !== 'dark'
      ? '#002169 !important'
      : '#FFFFFF !important'}`,
    }
  }
  });

  return useStyles();

};
