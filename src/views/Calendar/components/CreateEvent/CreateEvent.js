import React, { useState, useEffect } from 'react';
import default_image from 'assets/img/octopy-isotipo.png';
import useModal from 'hooks/useModal';
import usePerms from './hooks/usePerms';
import useLocalStorage from 'hooks/useLocalStorage';
import useApi from './api';
import { useStyles } from './CreateEventStyles.css';
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
    width: 200
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
      opacity: 1
    },
    '& .MuiInputBase-input': {
      textAlign: 'left',
      font: 'normal normal normal 18px Roboto',
      letterSpacing: '0px',
      color: '#FFFFFF',
      opacity: 1
    }
  }
}));

export const CreateEvent = ({ visible, onClose, changes }) => {
  const { labelsPerms, setPerms, setRol } = usePerms();
  const classes = useStyles();
  const history = useHistory();
  const intl = useIntl();
  const { getItem } = useLocalStorage();
  const { showDoctorCheckbox } = useDoctorCheckbox(getItem('token'));
  const { event, methods, list, data } = useEvent();
  const notAvaibleClass = data.availability ? '' : 'not-available';
  const [change, changePage] = useState(false);

  const toggled = () => {
    methods.updateAlertVisible(false);
    changePage(!change);
    onClose();
  };

  const togglePriority = (prior) => {
    methods.updatePriority(prior.target.value);
  };

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
      <h1 className={classes.title}>Agregar evento</h1>
      <div className="row mt-4">
        <div className={'col-8'}>
          <SearchSelectCalendar
            value={event.screen}
            onChange={(value) => methods.updateScreen(value)}
            searchItems={methods.SearchScreens}
            placeHolder={intl.formatMessage(messages.selectScreen)}
            labelProp="name"
            search={false}
            items={list.screens}
          />
        </div>
        <div className={'col'}>
          <Button
            className=""
            onClick={methods.CheckAvailability}
            disabled={!data.canCheckAvailability}
          >
            Disponibilidad
          </Button>
        </div>
      </div>

      <h2 className={classes.data}>Horario</h2>
      <h2 className={classes.subtitle}>
        Seleccione el rango de horarios para este evento.
      </h2>

      <div className={classes.range}>
        <FormControl
          variant="filled"
          fullWidth={true}
          disableUnderline={true}
          className={classes3.formControl}
        >
          <InputLabel
            id="demo-simple-select-filled-label"
            className={classes3.inputLabel}
            fullWidth={true}
            disableUnderline={true}
            autoFocus={true}
          >
            Rango de horario
          </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            label="hey"
            id="demo-simple-select-filled"
            value={data.custom}
            onChange={() => methods.setCustom(!data.custom)}
            className={classes3.select}
          >
            <MenuItem value={false}>Siempre</MenuItem>
            <MenuItem value={true}>Personalizado</MenuItem>
          </Select>
        </FormControl>
      </div>
      {data.custom ? (
        <>
          <h2 className={classes.subtitle}>
            Seleccione la hora de inicio para este evento.
          </h2>
          <div className="row mt-3">
            <div className="col-3 mt-4">
              <h2 className={classes.tag}>Fecha inicio:</h2>
            </div>
            <div className="col-4 mt-3">
              <DateInputCalendar
                value={event.startDate}
                onChange={(e) =>
                  methods.updateStartDate(
                    moment(e.target.value).format('YYYY-MM-DD')
                  )
                }
              />
            </div>
            <div className="col-2 mt-4">
              <h2 className={classes.tag}>Hora:</h2>
            </div>
            <div className="col-1 mt-3">
              <TimeInputCalendar
                value={event.startTime}
                onChange={(e) => methods.updateStartTime('00:00')}
              />
            </div>
          </div>

          <h2 className={classes.subtitle}>
            Seleccione la hora de finalización para este evento.
          </h2>
          <div className="row mt-3">
            <div className="col-3 mt-4">
              <h2 className={classes.tag}>Fecha inicio:</h2>
            </div>
            <div className="col-4 mt-3">
              <DateInputCalendar
                value={event.endDate}
                onChange={(e) =>
                  methods.updateEndDate(
                    moment(e.target.value).format('YYYY-MM-DD')
                  )
                }
              />
            </div>
            <div className="col-2 mt-4">
              <h2 className={classes.tag}>Hora:</h2>
            </div>
            <div className="col-1 mt-3">
              <TimeInputCalendar
                value={event.endTime}
                onChange={(e) => methods.updateEndTime('23:59')}
              />
            </div>
          </div>
        </>
      ) : null}

      <div className={classes.priority}>
        <FormControl
          variant="filled"
          fullWidth={true}
          disableUnderline={true}
          placeholder="hola"
          className={classes3.formControl}
        >
          <InputLabel
            id="demo-simple-select-filled-label"
            className={classes3.inputLabel}
            fullWidth={true}
            disableUnderline={true}
            autoFocus={true}
          >
            Prioridad
          </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            label="hey"
            id="demo-simple-select-filled"
            value={event.priority}
            onChange={(e) => togglePriority(e)}
            className={classes3.select}
          >
            <MenuItem value=""></MenuItem>
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
              <div className={classes.subtitle}>
                Orden de campañas relacionadas
              </div>
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
            <div
              className="col"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%'
              }}
            >
              <Button onClick={methods.AddEvent} className="mr-3">
                {intl.formatMessage(messages.save)}
              </Button>
              <Button onClick={onClose} style={{ background: '#1C1C1C' }}>
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Alert visible={data.alertVisible}>
          <div className="alert-text">
            {intl.formatMessage(messages.successCreated)}
          </div>
          <button onClick={toggled} className="alert-cancel-button">
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
      </div>
    </Drawer>
  );
};
