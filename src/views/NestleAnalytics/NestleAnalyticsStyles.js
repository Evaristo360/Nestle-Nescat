import { makeStyles } from '@material-ui/core/styles';
import { Images } from 'assets';

export const useNestleAnalyticsStyle = makeStyles({
  root: {
    width: '100%',
    minHeight: '80vh',
    paddingTop: '1rem',
    marginTop: '4rem',
    backgroundImage: `url(${Images.NestleAnalyticsBackground})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
  },
  mainContent:{
    width: '100%',
    padding: '0.5rem 2rem',
    height: '80vh'
  },
  welcomeContainer: {
    height: '90%',
    display: 'flex',
    flexDirection: 'column'
  },
  welcomeText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 53
  },
  infoContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  initSession: {
    color: 'white',
    letterSpacing: 0,
    opacity: 1,
    '& strong': {
      color: props => props.currentTheme.themeDark ? '#007CBA' : '#63513D'
    },
    fontSize: 33
  },
  yourStats: {
    color: '#FFFFFF',
    opacity: 0.5,
    marginTop: '1rem',
    fontSize: 27
  },
  titleCharts: {
    textAlign: "center",
    font: "normal normal normal 16px/21px Roboto",
    fontWeight: "bold",
    letterSpacing: 0,
    color: "#63513D",
    opacity: 1
  },
  dateContainer:{
    padding: "0px", 
    display:"flex", 
    alignItems:"center" 
  },
  dateTicketLabel:{
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
    padding: "0px",
    font: 'normal normal normal 18px Roboto',
    letterSpacing: '0px',
    color: props => props.currentTheme.texts
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
    width: '100%',
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
  mainButton:{
    background: '#002169',
    boxShadow: '0px 3px 3px #0000001A',
    borderRadius: '4px',
    opacity: '1',
    '&:hover, &:focus': { 
      width: "fit-content",
      background: '#002169',
    }
  },
  analyticsButton:{
    background: 'transparent',
    boxShadow: '0px 3px 3px #0000001A',
    borderRadius: '4px',
    border: '1px solid white',
    fontSize: 20,
    margin: 5,
    opacity: '1',
    '&:hover, &:focus': { 
      width: "fit-content",
      background: 'transparent',
    }
  },
  detectionButton:{
    background: props => props.currentTheme.themeDark ? '#000000' : '#002169',
    boxShadow: '0px 3px 3px #0000001A',
    borderRadius: '4px',
    fontSize: 20,
    margin: 5,
    opacity: '1',
    '&:hover, &:focus': { 
      width: "fit-content",
      background: props => props.currentTheme.themeDark ? '#000000' : '#002169',
    }
  },
});
