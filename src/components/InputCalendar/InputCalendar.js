import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { es } from "date-fns/locale";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';

const classes = {
  input: {
    color: 'red'
  }
};

export default function InputCalendar({
  label,
  defaultDate = null,
  onChangeDate,
  date,
  mindate = undefined,
  maxdate = undefined,
  className,
  labelContainer,
  disabled
}) {
    const [locale, setLocale] = React.useState('es-ES');
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (d) => {
    // setSelectedDate(date);
    // console.log('CAMBIANDO DATA', date);
    onChangeDate(d);
  };

  return (
    <MuiPickersUtilsProvider locale={es} utils={DateFnsUtils}>
      <div className="row">
        <div className={`${labelContainer} col-md-4`}>
          <div className="label-input">{label}</div>
        </div>
        <div className="col-md-7 ml">
          <KeyboardDatePicker
            className={className}
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            value={date}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
            placeholder="dd/mm/aaaa"
            minDate={mindate}
            maxDate={maxdate}
            minDateMessage={"No puede ser menor a " + new Date(mindate).toLocaleDateString()}
            maxDateMessage={"No puede ser mayor a " + new Date(maxdate).toLocaleDateString()}
            invalidDateMessage={"Fecha inválida"}
            disabled={disabled}
          />
        </div>
      </div>
    </MuiPickersUtilsProvider>
  );
}

InputCalendar.defaultProps = {
  onChangeDate: () => {}
};
