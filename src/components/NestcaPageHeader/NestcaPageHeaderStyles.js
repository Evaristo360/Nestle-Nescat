import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  root: {
    width: '100%',
    padding: '1rem',
    paddingBottom: '1.8rem',
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
    color: ({ currentTheme }) => currentTheme.titles,
    font: 'normal normal bold 25px/33px Roboto'
  },
  count: {
    color: ({ currentTheme }) => currentTheme.titles,
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
  iconCont: {
    width: '44px',
    height: '44px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '1rem',
    marginTop: '0.3rem'
  }
});
