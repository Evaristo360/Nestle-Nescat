import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

export const CheckBoxStyle = withStyles({
  root: {
    color: '#63513D',
    '&$checked': {
      color: '#007CBA'
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export const useStyles = makeStyles({
  subtitle: {
    marginTop: '40px',
    textAlign: 'left',
    font: 'normal normal normal 21px Roboto',
    letterSpacing: '0px',
    color: '#007CBA',
    opacity: 1
  },
  checkboxLabel: {
    '& .MuiIconButton-root.Mui-disabled':{
      color: props => props.currentTheme.texts
    },
    '& .MuiFormControlLabel-label.Mui-disabled':{
      textAlign: 'left',
      font: 'normal normal normal 18px Roboto',
      letterSpacing: '0px',
      color: props => props.currentTheme.texts,
      opacity: 1
    },
    textAlign: 'left',
    font: 'normal normal normal 16px Roboto',
    letterSpacing: '0px',
    color: props => props.currentTheme.texts,
    opacity: 1
  },
  dateTicketLabel:{
    display: "flex",
    alignItems: 'center',
    padding: "0px",
    font: 'normal normal normal 18px Roboto',
    letterSpacing: '0px',
    color: props => props.currentTheme.texts
  },
  pagesTitle: {
    textAlign: 'left',
    font: 'normal normal normal 21px Roboto',
    letterSpacing: '0px',
    color: '#FFFFFF',
    opacity: 1
  },
  datepicker: {
      width: '100%',
      "& .MuiInput-root":{
        backgroundColor: 'rgba(0, 0, 0, 0.09)',
      },
      "& .MuiInputBase-input": {
        padding: '13px 12px',
        background: 'rgba(225, 225, 225, 0.15)',
        borderRadius: '5px',
        color: props => props.currentTheme.texts
      },
      '& .MuiFormLabel-root, & .MuiFormLabel-root.Mui-focused, & .MuiFormLabel-root.Mui-disabled': {
        color: props => props.currentTheme.texts + "80"
      },
      '& .MuiFormHelperText-root': {
        color: props => props.currentTheme.texts + "80"
      }
  },
  textField: {
    marginTop: '1rem!important',
    '& .MuiInputBase-input': {
      background: 'rgba(225, 225, 225, 0.15)',
      borderRadius: '5px',
      color: props => props.currentTheme.texts
    },
    '& .MuiFormLabel-root, & .MuiFormLabel-root.Mui-focused, & .MuiFormLabel-root.Mui-disabled': {
      color: props => props.currentTheme.texts + "80"
    },
    '& .MuiFormHelperText-root': {
      color: props => props.currentTheme.texts + "80"
    }
  },
  textSearchField: {
    marginTop: '1rem!important',
    backgroundColor: ' rgba(225, 225, 225, 0.15)',
    borderRadius: '5px',
    '& .MuiAutocomplete-inputRoot ': {
      color: props => props.currentTheme.texts,
      padding:15,
      resize:"vertical",
      minHeight:28
    },
    '& .MuiFormControl-marginDense':{
      marginTop: '0px',
    },
    '& .MuiInputLabel-filled.MuiInputLabel-marginDense':{
      color: props => props.currentTheme.texts + "80"
    },
    '& .MuiAutocomplete-input': {
      color: props => props.currentTheme.texts
    },
    '& .MuiFormHelperText-root': {
      color: props => props.currentTheme.texts + "80"
    },
  },
  maincontainerForm:{
    paddingLeft: 100,
    display: "flex", 
    flexDirection: "column", 

  },
  mainContainerImage:{
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center"
  },
  cardContainerImage:{
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center", 
    minHeight:"600px", 
    maxHeight:"600px", 
    width:"100%",
    borderRadius:"5px",
    border:"2px solid #E1E1E1"
  },
  imageConfig:{
    minHeight:"100%",
    maxHeight:"100%", 
    width:"100%",
    padding: 10
  },
  mainButton:{
    marginRight: 15,
    background: '#002169',
    boxShadow: '0px 3px 3px #0000001A',
    borderRadius: '4px',
    opacity: '1',    
    width: "fit-content",
    '&:hover, &:focus': { 
      width: "fit-content",
      background: '#002169',
    }
  },
  buttonsContainer:{
    marginTop: 20,
    marginBottom: 50,
  },
  lblUsedTicket:{
    display: "flex",
    alignItems: 'center',
    padding: "0px",
    font: 'normal normal normal 14px Roboto',
    letterSpacing: '0px',
    color: props => props.currentTheme.texts + "4D",
  },
});