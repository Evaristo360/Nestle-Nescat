import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  example: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
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
