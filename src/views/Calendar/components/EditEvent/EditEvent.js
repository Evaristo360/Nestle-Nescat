import React, { useState, useEffect } from 'react';
import default_image from 'assets/img/octopy-isotipo.png';
import useModal from 'hooks/useModal';
import usePerms from './hooks/usePerms';
import useLocalStorage from 'hooks/useLocalStorage';
import useApi from './api';
import { useStyles } from './EditEventStyles.css';
import { useHistory } from 'react-router-dom';
import useHandleData from './hooks/useHandleData';
import useValidation from './hooks/useValidation';
import { initialData } from './data';
import _ from 'lodash-es';
import MenuItems from './MenuItems';
import moment from 'moment';
import DateInputCalendar from 'components/Inputs/ListFiltersInputs/DateInputCalendar';
import TimeInputCalendar from 'components/Inputs/TimeInputCalendar';

import { useIntl } from 'react-intl';
import FormControl from '@material-ui/core/FormControl';
import Button from 'components/Button';
import { Drawer, TextField } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { useEvent } from './hooks/useEvent';
import ItemsContainer from 'components/ItemsContainer';
import { useDoctorCheckbox } from './hooks/useDoctorCheckbox';

import { EventCreateModalSimpleAccept as Alert } from 'components/Modals/EventCreateModalSimpleAccept';
import SearchSelectCalendar from 'components/Selects/SearchSelectCalendar';
import { messages } from './messagess';

const useStyles3 = makeStyles((theme) => ({
  formControl: {
    background: '#E1E1E126 0% 0% no-repeat padding-box',
    borderRadius: '4px 4px 0px 0px',
    opacity: 1,
    '&.MuiFilledInput-underline, &.Mui-focused': {
      color: '#FFFFFF80',
      opacity: 1
    },
    '& .MuiInputBase-root': {
      height: '50px',
      textAlign: 'left',
      font: 'normal normal normal 20px Roboto',
      letterSpacing: '0px',
      color: '#FFFFFF',
      opacity: 1
    },
    '& .MuiInputLabel-root': {
      textAlign: 'left',
      font: 'normal normal normal 20px Roboto',
      letterSpacing: '0px',
      color: '#FFFFFF80',
      opacity: 1
    }
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  select: {
    textAlign: 'left',
    font: 'normal normal normal 20px Roboto',
    letterSpacing: '0px',
    color: '#FFFFFF80',
    opacity: 1
  },

  inputLabel: {
    textAlign: 'left',
    font: 'normal normal normal 20px Roboto',
    letterSpacing: '0px',
    color: '#FFFFFF80',
    opacity: 1,
    '&.Mui-focused': {
      color: '#FFFFFF80',
      opacity: 1
    }
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  date: {
    textAlign: 'left',
    font: 'normal normal normal 24px Roboto',
    letterSpacing: '0px',
    color: '#FFFFFF',
    opacity: 1,
    '& .MuiInputLabel-root': {
      textAlign: 'left',
      font: 'normal normal normal 16px Roboto',
      letterSpacing: '0px',
      color: '#FFFFFF',
      opacity: 1,
    },
    '& .MuiInputBase-input': {
      textAlign: 'left',
      font: 'normal normal normal 18px Roboto',
      letterSpacing: '0px',
      color: '#FFFFFF',
      opacity: 1,
    }
  }
}));

export const EditEvent = ({ visible, onClose, resource, changes }) => {
  const { labelsPerms, setPerms, setRol } = usePerms();
  const classes = useStyles();
  const history = useHistory();
  const intl = useIntl();
  const { getItem } = useLocalStorage();
  const { showDoctorCheckbox } = useDoctorCheckbox(getItem('token'));
  const { event, methods, list, data } = useEvent();
  const notAvaibleClass = data.availability ? '' : 'not-available';

  const [enable, setEnable] = useState('');
  const [enableValue, setEnableValue] = useState(false);
  const [change, setChange] = useState(false);
  const [eventId, setEventId] = useState(0);
  const [updateEnable, setUpdateEnable] = useState('');
  const toggleEnable = (enables) => {
    setEnable(enables.target.value);
    if (enables.target.value) {
      setUpdateEnable(true);
      methods.updateStartTime('00:00');
      methods.updateEndTime('23:59');
      setEnableValue(true);
    } else {
      setUpdateEnable(false);
      setEnableValue(true);
    }
  };

  const togglePriority = (prior) => {
    methods.updatePriority(prior.target.value);
  };

  useEffect(() => {
    methods.resetValues();
    setEnableValue(false);
    (async () => {
      await methods.idUpdate(resource);
    })();
  }, [resource, changes]);

  const classes3 = useStyles3();
  const [age, setAge] = React.useState('');

  const handleChangeses = (event) => {
    setAge(event.target.value);
  };

  return (
    <Drawer
      anchor="right"
      open={visible}
      onClose={onClose}
      className={classes.root}
    >
      <h1 className={classes.title}>Editar Evento</h1>
      <div className="row mt-4">
        <div className={"col-8"}>
          <SearchSelectCalendar
            value={event.screen}
            onChange={(value) => methods.updateScreen(value)}
            searchItems={methods.SearchScreens}
            placeHolder={intl.formatMessage(messages.selectScreen)}
            labelProp="name"
            search={false}
            items={list.screens}
          />
          {/* <FormControl variant="filled" fullWidth={true} disableUnderline={true} placeholder="hola" className={classes3.formControl}>
            <InputLabel
              id="demo-simple-select-filled-label"
              placeholder="hola"
              className={classes3.inputLabel}
              fullWidth={true}
              disableUnderline={true}
              autoFocus={true}
            >Seleccionar Pantalla</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              label="hey"
              id="demo-simple-select-filled"
              value={event.screen}
              onChange={(value) => methods.updateScreen(value)}
              className={classes3.select}
            >
              <MenuItem value="">Ninguna</MenuItem>
              <MenuItems menu={true} />
            </Select>
          </FormControl> */}
        </div>
        <div className={"col"}>
          <Button
            className=""
            onClick={methods.CheckAvailability}
            disabled={!data.canCheckAvailability}
          >Disponibilidad</Button>
        </div>
      </div>

      <h2 className={classes.data}>Horario</h2>
      <h2 className={classes.subtitle}>
        Seleccione el rango de horarios para este evento.
      </h2>
      {/* <h3 className={classes.rol}>Rol Asignado: Operador Nestlé</h3> */}

      <div className={classes.range}>
        <FormControl variant="filled" fullWidth={true} disableUnderline={true} placeholder="hola" className={classes3.formControl}>
          <InputLabel 
            id="demo-simple-select-filled-label"
            className={classes3.inputLabel}
            fullWidth={true}
            disableUnderline={true}
          >Rango de horario</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            label="hey"
            id="demo-simple-select-filled"
            value={updateEnable}
            onChange={(e) => toggleEnable(e)}
            className={classes3.select}
          >
            <MenuItem value={true}>Siempre</MenuItem>
            <MenuItem value={false}>Personalizado</MenuItem>
          </Select>
        </FormControl>
      </div>

      <h2 className={classes.subtitle}>Seleccione la hora de inicio para este evento.</h2>
      <div className='row mt-3'>
        <div className='col-3 mt-4'>
          <h2 className={classes.tag}>Fecha inicio:</h2>
        </div>
        <div className='col-4 mt-3'>
          {/* <form noValidate>
            <TextField
              id="date"
              label="Fecha:"
              type="date"
              defaultValue="2017-05-24"
              InputLabelProps={{
                shrink: true
              }}
              className={classes3.date}
            />
          </form> */}
          {enableValue ? (
            <DateInputCalendar
              value={event.startDate}
              onChange={(e) =>
                methods.updateStartDate(
                  moment(e.target.value).format('YYYY-MM-DD')
                )
              }
            />
          ) : null}
        </div>
        <div className='col-2 mt-4'>
          <h2 className={classes.tag}>Hora:</h2>
        </div>
        <div className='col-1 mt-3'>
          {/* <form noValidate>
            <TextField
              id="time"
              label="Hora:"
              type="time"
              defaultValue="07:30"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              className={classes3.date}
            />
          </form> */}
          {enableValue ? (
            enable ? (
              <TimeInputCalendar
                value={event.startTime}
                onChange={(e) => methods.updateStartTime("00:00")}
              />
            ) : (
              <TimeInputCalendar
                value={event.startTime}
                onChange={(e) => methods.updateStartTime(e.target.value)}
              />
            )
          ) : null}
        </div>
      </div>

      <h2 className={classes.subtitle}>Seleccione la hora de finalización para este evento.</h2>
      <div className='row mt-3'>
        <div className='col-3 mt-4'>
          <h2 className={classes.tag}>Fecha de finalización:</h2>
        </div>
        <div className='col-4 mt-3'>
          {/* <form noValidate>
            <TextField
              id="date"
              label="Fecha:"
              type="date"
              defaultValue="2017-05-24"
              InputLabelProps={{
                shrink: true
              }}
              className={classes3.date}
            />
          </form> */}
          {enableValue ? (
            <DateInputCalendar
              value={event.endDate}
              onChange={(e) =>
                methods.updateEndDate(moment(e.target.value).format('YYYY-MM-DD'))
              }
            />
          ) : null}
        </div>
        <div className='col-2 mt-4'>
          <h2 className={classes.tag}>Hora:</h2>
        </div>
        <div className='col-1 mt-3'>
          {/* <form noValidate>
            <TextField
              id="time"
              label="Hora:"
              type="time"
              defaultValue="07:30"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              className={classes3.date}
            />
          </form> */}
          {enableValue ? (
            enable ? (
              <TimeInputCalendar
                value={event.endTime}
                onChange={(e) => methods.updateEndTime("23:59")}
              />
            ) : (
              <TimeInputCalendar
                value={event.endTime}
                onChange={(e) => methods.updateEndTime(e.target.value)}
              />
            )
          ) : null}
        </div>
      </div>

      <div className={classes.priority}>
        <FormControl variant="filled" fullWidth={true} disableUnderline={true} className={classes3.formControl}>
          <InputLabel 
            id="demo-simple-select-filled-label" 
            className={classes3.inputLabel}
            fullWidth={true}
            disableUnderline={true}
          >Prioridad</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            label="hey"
            id="demo-simple-select-filled"
            value={event.priority}
            onChange={(e) => togglePriority(e)}
            className={classes3.select}
          >
            <MenuItem value={true}>Si</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
        </FormControl>
      </div>

      <h2 className={classes.data}>Campaña</h2>
      <h2 className={classes.subtitle}>
        Seleccione una campaña para mostrar en este evento.
      </h2>
      <div className="row mt-4">
        <div className="col-8">
          {/* <FormControl variant="filled" fullWidth={true} disableUnderline={true} placeholder="hola" className={classes3.formControl}>
            <InputLabel 
              id="demo-simple-select-filled-label" 
              className={classes3.inputLabel}
              fullWidth={true}
              disableUnderline={true}
            >Campaña</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={event.campaign}
              onChange={(value) => methods.updateCampaign(value)}
              className={classes3.select}
            >
              <MenuItem value="">Ninguna</MenuItem>
              <MenuItems menu={false} />
            </Select>
          </FormControl> */}
          <SearchSelectCalendar
            items={list.campaigns}
            labelProp="name"
            onChange={(value) => methods.updateCampaign(value)}
            searchItems={methods.SearchCampaigns}
            value={event.campaign}
            placeHolder={intl.formatMessage(messages.searchCampaign)}
          />
        </div>
        <div className="col-3">
          <Button
            className="btn-small mb-1"
            disabled={!event.campaign}
            onClick={methods.addScreenCampaigns}
          >
            {intl.formatMessage(messages.add)}
          </Button>
        </div>
      </div>
      <div className={classes.range}>
        {
          <div className={'row'}>
            <div className="col">
              <div className={classes.subtitle}>Orden de campañas relacionadas</div>
              <ItemsContainer
                removeItem={methods.removeScreenCampaigns}
                items={list.screenCampaigns}
                labelProp="name"
                loading={data.loadingCampaigns}
                changeItems={methods.changeScreenCampaigns}
              />
            </div>
          </div>
        }
      </div>

      <div className={`row mt-3`}>
        <div className="col-6">
          <div className="row">
            <div className="col">
              <Button onClick={methods.UpdateEvent} disabled={!data.canUpdate}>
                {intl.formatMessage(messages.save)}
              </Button>
            </div>
            <div className="col">
              <Button
                onClick={onClose}
                style={{background: '#1C1C1C' }}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Alert visible={data.alertVisible}>
        <div className="alert-text">
          {intl.formatMessage(messages.successCreated)}
        </div>
        <button
          onClick={() => {
            methods.updateAlertVisible(false);
            history.push('/calendar');
          }}
          className="alert-cancel-button"
        >
          {intl.formatMessage(messages.accept)}
        </button>
      </Alert>
      <Alert visible={data.showModal} onClose={methods.toggleModal}>
        <div className="alert-text">
          <b>{data.modalTitle}</b>
        </div>
        <div className="alert-text mt-2">{data.modalText}</div>
        <button onClick={methods.toggleModal} className="alert-cancel-button">
          {intl.formatMessage(messages.accept)}
        </button>
      </Alert>

      {/* <Grid
        container
        justify="flex-start"
        alignItems="center"
        style={{ marginTop: '2rem' }}
      >
        <Button onClick={handleSave}>Guardar</Button>
        <Button
          onClick={onClose}
          style={{ marginLeft: '1rem', background: '#1C1C1C' }}
        >
          Cancelar
        </Button>
      </Grid> */}
    </Drawer>
  );
};
