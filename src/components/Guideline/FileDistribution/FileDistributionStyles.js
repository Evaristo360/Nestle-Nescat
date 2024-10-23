import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  subtitle: {
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      marginRight: theme.spacing(0.5)
    }
  },
  iconFile: {
    width: theme.typography.pxToRem(40),
    height: theme.typography.pxToRem(40),
    marginRight: theme.spacing(1)
  },
  fileName: {
    fontSize: theme.typography.pxToRem(40),
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(28),
      fontWeight: 400
    }
  },
  headerSection: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  description: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  codeBlock: {
    width: '100%',
    fontFamily: 'consolas'
  },
  accordion: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    '& svg': {
      color: theme.palette.common.white
    }
  }
}));

export { useStyles };
