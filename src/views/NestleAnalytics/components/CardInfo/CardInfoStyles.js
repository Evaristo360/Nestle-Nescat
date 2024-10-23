import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  cardContainer:{
    minHeight:190
  },
  iconStyle: {
    marginTop: 20
  },
  textTitle: {
    font: 'normal normal normal 18px Roboto',
    letterSpacing: 0,
    color: '#63513D80',
    opacity: 1,
    margin: "10px 0px"
  },
  textTotalTitle: {
    font: 'normal normal normal 10px Roboto',
    letterSpacing: 0,
    color: '#63513D',
    opacity: 1,
  },
  textTotal: {
    font: 'normal normal normal 33px Roboto',
    letterSpacing: 0,
    color: '#63513D',
    opacity: 1,
  },
  textLastTitle: {
    font: 'normal normal normal 10px Roboto',
    letterSpacing: 0,
    color: '#63513D4D',
    opacity: 1,
  },
  textLastTotal: {
    font: 'normal normal normal 33px Roboto',
    letterSpacing: 0,
    color: '#63513D4D',
    opacity: 1,
  },
  divider:{
    backgroundColor: "#42414D1C!important",
    width:"3px!important"
  }
});
