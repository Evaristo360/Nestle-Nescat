import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  root: {
    width: '100%',
    padding: '1rem',
    background: (props) => props.background,
    textAlign: 'center'
  },
  thead: {
    '& th': {
      paddingTop: '0.4rem',
      paddingBottom: '0.4rem',
      textTransform: 'uppercase'
    },
    background: (props) => props.backgroundHeader
  },
  tableCalendarCont: {
    width: '100%'
  },
  tableCalendar: {
    width: '100%',
    overflowX: 'scroll'
  },
  day: {
    width: '5rem',
    maxWidth: '5rem',
    height: '6rem',
    padding: '0.5rem',
    border: (props) => `0.5px solid ${props.borderDayColor}`,
    position: 'relative'
  },
  week: {},
  labelDay: {
    width: '100%',
    textAlign: 'right',
    display: 'block',
    position: 'absolute',
    top: 5,
    right: 5
  },
  dailyEventsCont: {
    width: '100%',
    display: 'block',
    position: 'relative',
    textAlign: 'left'
  },
  eventButton: {
    background: 'transparent',
    border: 'none',
    outline: 'none',
    padding: 0,
    margin: 0
  },
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  calendarMonthYear: {
    color: (props) => props.colorLabels,
    fontWeight: 'bold',
    display: 'flex',
    minWidth: '10rem'
  },
  monthButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  iconMonth: {
    marginLeft: '0.6rem',
    backgroundColor: 'transparent!important',
    border: 'none',
    boxShadow: 'none'
  },
  customSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  todayButton: {
    background: 'transparent!important',
    color: (props) => `${props.colorTodayButton}!important`,
    marginRight: '0.5rem',
    padding: '0.5rem 1rem'
  },
  spanTodayButton: {
    fontSize: '1rem'
  },
  datePicker: {
    padding: '0.5rem',
    '& .MuiInput-input': {
      color: (props) => `${props.colorTodayButton}`
    },
    '& .MuiInputAdornment-root button': {
      color: (props) => `${props.colorTodayButton}`
    },
    '& .MuiInput-underline::before, .Mui-focusase-formControl.MuiInput-underline::before': {
      borderBottom: (props) => `1px solid ${props.colorTodayButton}`
    }
  }
});
