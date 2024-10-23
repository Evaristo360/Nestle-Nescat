import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: `${theme.zIndex.drawer} !important`
  },
  container: {
    backgroundColor: theme.palette.common.drawerBackground
  }
}));

export { useStyles };
