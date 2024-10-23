import React from 'react';
import { FormControl, TextField, MenuItem } from '@material-ui/core';
import { useFormStyles } from 'hooks/useFormStyles';
import DrawerModal from 'components/DrawerModal';
import { useEventEdit } from './hooks/useEventEdit';
import { useStyles } from './EventEditStyles';
import ItemsContainer from 'components/ItemsContainer';
import CancelOkModal from 'components/CancelOkModal';

export const EventEdit = ({ visible, onClose, onAccept, id, newEvent, onDeleted }) => {
  const formClasses = useFormStyles();
  const {
    formik,
    isEdit,
    screens,
    campaigns,
    loading,
    onChangeCampaignIds,
    onChangeCampaignOrder,
    selectedCampaigns,
    removeCampaignId,
    deleteEvent,
    modal
  } = useEventEdit({ id, onAccept, onClose, newEvent});
  const classes = useStyles();

  const onDelete = () => {
    onClose();
    let response = deleteEvent(id);
    if(response) onDeleted();
  };

  return (
    <DrawerModal
      useScroll
      visible={visible}
      onClose={onClose}
      onAccept={formik.handleSubmit}
      title={isEdit ? 'Editar evento' : 'Agregar evento'}
      disabledAccept={formik.isValid}
      onDelete={onDelete}
      showButtonDelete = {isEdit ? true : false}
    >
      <CancelOkModal
        title={modal.title}
        text={modal.text}
        visible={modal.showModal}
        onAccept={modal.onAccept}
        onCancel={modal.onCancel}
      />
      <FormControl>
        <TextField
          select
          label="Pantalla"
          name="screen_id"
          placeholder="Seleccionar"
          variant="filled"
          margin="dense"
          InputProps={{ disableUnderline: true }}
          helperText={formik.touched.screen_id && formik.errors.screen_id}
          className={formClasses.textField}
          onChange={formik.handleChange}
          value={formik.values.screen_id}
        >
          {screens.map((sc, index) => (
            <MenuItem key={index} value={sc.id}>
              {sc.name}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
      <FormControl style={{ marginTop: '1rem' }}>
        <p className={formClasses.subLabel}>Horario</p>
        <p className={formClasses.description}>
          Seleccione el rango de horario para este evento.
        </p>
        <TextField
          select
          label="Rango de horario"
          name="custom"
          placeholder="Seleccionar"
          variant="filled"
          margin="dense"
          InputProps={{ disableUnderline: true }}
          helperText={formik.touched.custom && formik.errors.custom}
          className={formClasses.textField}
          onChange={formik.handleChange}
          value={formik.values.custom}
        >
          <MenuItem value={false}>Siempre</MenuItem>
          <MenuItem value={true}>Personalizado</MenuItem>
        </TextField>
      </FormControl>
      {formik.values.custom ? (
        <FormControl style={{ marginTop: '1rem' }}>
          <p className={formClasses.description}>
            Seleccione la hora de inicio para este evento.
          </p>
          <div className={classes.datetimeCont}>
            <TextField
              type="date"
              label="Fecha inicio"
              name="start_date"
              variant="filled"
              margin="dense"
              InputProps={{ disableUnderline: true }}
              InputLabelProps={{ shrink: true }}
              helperText={formik.touched.start_date && formik.errors.start_date}
              className={formClasses.textField}
              onChange={formik.handleChange}
              value={formik.values.start_date}
            ></TextField>
            <TextField
              type="time"
              label="Hora inicio"
              name="start_time"
              variant="filled"
              margin="dense"
              InputProps={{ disableUnderline: true }}
              InputLabelProps={{ shrink: true }}
              helperText={formik.touched.start_time && formik.errors.start_time}
              className={formClasses.textField}
              onChange={formik.handleChange}
              value={formik.values.start_time}
            ></TextField>
          </div>
        </FormControl>
      ) : null}

      {formik.values.custom ? (
        <FormControl style={{ marginTop: '1rem' }}>
          <p className={formClasses.description}>
            Seleccione la hora de finalización para este evento.
          </p>
          <div className={classes.datetimeCont}>
            <TextField
              type="date"
              label="Fecha fin"
              name="end_date"
              variant="filled"
              margin="dense"
              InputProps={{ disableUnderline: true }}
              InputLabelProps={{ shrink: true }}
              helperText={formik.touched.end_date && formik.errors.end_date}
              className={formClasses.textField}
              onChange={formik.handleChange}
              value={formik.values.end_date}
            ></TextField>
            <TextField
              type="time"
              label="Hora fin"
              name="end_time"
              variant="filled"
              margin="dense"
              InputProps={{ disableUnderline: true }}
              InputLabelProps={{ shrink: true }}
              helperText={formik.touched.end_time && formik.errors.end_time}
              className={formClasses.textField}
              onChange={formik.handleChange}
              value={formik.values.end_time}
            ></TextField>
          </div>
        </FormControl>
      ) : null}
      <FormControl>
        <TextField
          select
          label="Prioridad"
          name="priority"
          placeholder="Seleccionar"
          variant="filled"
          margin="dense"
          InputProps={{ disableUnderline: true }}
          helperText={formik.touched.priority && formik.errors.priority}
          className={formClasses.textField}
          onChange={formik.handleChange}
          value={formik.values.priority}
        >
          <MenuItem value={false}>No</MenuItem>
          <MenuItem value={true}>Si</MenuItem>
        </TextField>
      </FormControl>

      <FormControl style={{ marginTop: '1rem' }}>
        <p className={formClasses.subLabel}>Campaña</p>
        <p className={formClasses.description}>
          Seleccione una campaña para mostrar en este evento
        </p>
        <TextField
          select
          label="Campaña"
          name="campaign_ids"
          placeholder="Seleccionar"
          variant="filled"
          margin="dense"
          InputProps={{ disableUnderline: true }}
          helperText={formik.touched.campaign_ids && formik.errors.campaign_ids}
          className={formClasses.textField}
          onChange={onChangeCampaignIds}
          value={''}
        >
          {campaigns.map((cam, index) => (
            <MenuItem value={cam.id} key={index}>
              {cam.name}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
      <div>
        <ItemsContainer
          items={selectedCampaigns}
          labelProp="name"
          loading={loading}
          removeItem={removeCampaignId}
          changeItems={onChangeCampaignOrder}
        />
      </div>
    </DrawerModal>
  );
};
