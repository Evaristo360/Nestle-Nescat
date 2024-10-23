import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  root: {
    width: '100%',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    background: '#E1E1E133',
    marginTop: '4rem'
  },
  section: {
    width: '50%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: '1rem'
  },
  title: {
    color: props => props.currentTheme.titles,
    font: 'normal normal bold 25px/33px Roboto'
  },
  count: {
    color: '#002169',
    font: 'normal normal normal 25px/21px Roboto'
  },
  searchItem: {
    width: '60%',
    marginLeft: '10%',
    border: '1px solid #63513D80',
    borderRadius: '4px',
    background: 'white',
    padding: '0.3rem 0.7rem'
  },
  screensSelected: {
    width: '70%',
    marginRight: '1rem',
    padding: '0.3rem 0.7rem',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  screenBtn: {
    fontSize: '12px'
  },
  iconCont: {
    width: '44px',
    height: '44px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '1rem',
    marginTop: '0.3rem'
  }, 
  lblPosition: {
    '&.MuiInputLabel-outlined.MuiInputLabel-shrink':{
      transform: "translate(14px, 6px) scale(0.75)",
    }
  },
  
  textPosition: {
    '& .MuiSelect-outlined.MuiSelect-outlined':{
      transform: "translate(-14px, 6px) scale(0.75)"
    },
  }
});
