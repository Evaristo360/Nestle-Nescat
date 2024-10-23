import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    '& .MuiFormControl-root': {
      marginBottom: theme.spacing(2.5),
      borderRadius: theme.spacing(0.5),
      '& div:first-of-type': {
        borderRadius: theme.spacing(0.5)
      },
      '& p.Mui-error': {
        position: 'absolute',
        bottom: -theme.spacing(2.2)
      }
    }
  },
  withInputBackground: {
    '& .MuiFormControl-root': {
      backgroundColor: theme.palette.background.paper
    }
  },
  withoutInputBorder: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.background.paper
      }
    }
  },
  submitError: {
    textAlign: 'center',
    color: theme.palette.warning.light,
    fontSize: theme.typography.body2.fontSize
  }
}));

export { useStyles };
