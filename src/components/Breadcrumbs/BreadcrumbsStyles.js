import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1)
  },
  link: {
    display: 'flex',
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  active: {
    color: theme.palette.text.primary
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20
  }
}));

export { useStyles };
