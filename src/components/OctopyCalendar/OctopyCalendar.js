import React from 'react';
import Fab from '@material-ui/core/Fab';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import IconButton from 'components/IconButton';
import AddIcon from 'assets/icons/add.svg';
import Button from 'components/Button';
import { useStyles } from './OctopyCalendarStyles';
import { useOctopyCalendar } from './useOctopyCalendar';

export const OctopyCalendar = ({
  events = [
    /*
    {
      start_date: new Date(2021, 7, 1),
      end_date: new Date(2021, 7, 10),
      end_time: '11:00',
      start_time: '12:00',
      always: true,
      resource: { id: 1, priority: false, custom: false }
    }*/
  ],
  EventItem = null,
  onClickEvent,
  handleAddEvent,
  background = '#FFFFFF',
  backgroundDays = '#FFFFFF',
  backgroundToday = '#007CBA0A',
  backgroundHeader = '#007CBA0A',
  borderDayColor = '#8589974D',
  colorLabels = '#63513D',
  colorTodayButton = '#0CA3FF'
}) => {
  const classes = useStyles({
    background,
    backgroundHeader,
    backgroundToday,
    backgroundDays,
    borderDayColor,
    colorLabels,
    colorTodayButton
  });

  const {
    daysOfMonth,
    getDayOfMonth,
    getDayEvents,
    handleClickEvent,
    getDisplayMonthAndYear,
    goPrevMonth,
    goNextMonth,
    goToday,
    selectedDate,
    onChangeSelectedDate
  } = useOctopyCalendar({
    events,
    onClickEvent
  });

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.monthButtons}>
          <span className={classes.calendarMonthYear}>
            {getDisplayMonthAndYear()}
          </span>
          <Fab
            className={classes.iconMonth}
            disableFocusRipple
            disableRipple
            size="small"
            onClick={goPrevMonth}
          >
            <ArrowLeftIcon fontSize="large" />
          </Fab>
          <Fab
            className={classes.iconMonth}
            disableFocusRipple
            disableRipple
            size="small"
            onClick={goNextMonth}
          >
            <ArrowRightIcon fontSize="large" />
          </Fab>
        </div>
        <div className={classes.customSection}>
          <Button onClick={goToday} className={classes.todayButton}>
            <span className={classes.spanTodayButton}>Hoy</span>
          </Button>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              className={classes.datePicker}
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label=""
              value={selectedDate}
              onChange={onChangeSelectedDate}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
          </MuiPickersUtilsProvider>

          <IconButton
            icon={AddIcon}
            className="link-add-event"
            onClick={handleAddEvent}
          >
            Agregar evento
          </IconButton>
        </div>
      </div>
      <div className={classes.tableCalendarCont}>
        <table className={classes.tableCalendar}>
          <thead>
            <tr className={classes.thead}>
              <th> Dom</th>
              <th> Lun</th>
              <th> Mar</th>
              <th> Mie</th>
              <th> Jue</th>
              <th> Vie</th>
              <th> Sáb</th>
            </tr>
          </thead>
          <tbody>
            {[0, 1, 2, 3, 4].map((week) => (
              <tr key={week} className={classes.week}>
                {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                  <td key={day} className={classes.day}>
                    <span className={classes.labelDay}>
                      {getDayOfMonth(daysOfMonth, week, day).getDate()}
                    </span>
                    <span className={classes.dailyEventsCont}>
                      {EventItem ? (
                        <>
                          {getDayEvents(
                            getDayOfMonth(daysOfMonth, week, day)
                          ).map((event, index) => (
                            <button
                              className={classes.eventButton}
                              key={index}
                              onClick={() =>
                                handleClickEvent({
                                  date: getDayOfMonth(daysOfMonth, week, day),
                                  event
                                })
                              }
                            >
                              <EventItem
                                date={getDayOfMonth(daysOfMonth, week, day)}
                                resource={event.resource}
                              />
                            </button>
                          ))}
                        </>
                      ) : null}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
