import { css } from '@emotion/react';
import { makeStyles } from '@material-ui/core/styles';

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

export const useStyles = makeStyles({
  root: {
    '& .MuiPaper-root': {
      width: '35%',
      background: (props) => `${props.currentTheme.menu} 0% 0% no-repeat padding-box`,
      backgroundColor: (props) => props.currentTheme.menu,
      border: '1px solid #0000001F',
    }
  },
  title: {
    color: (props) => props.currentTheme.drawer_title,
    font: 'normal normal bold 20px/26px Roboto',
    textAlign: 'left'
  },
  status_title: {
    marginTop: '2rem!important',
    color: '#007CBA',
    font: 'normal normal medium 16px/21px Roboto'
  },
  contentDrawer: {
    width: '100%',
    height: '90%',
    display: 'flex',
    padding:"1rem 3rem",
    flexDirection: 'column',
    overflowY: (props) => (props.useScroll ? 'scroll' : 'hidden')
  }
});
