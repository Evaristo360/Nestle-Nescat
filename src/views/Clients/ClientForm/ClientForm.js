import React, { useEffect, useReducer, useState } from 'react';
import DrawerModal from 'components/DrawerModal';
import { TextField, FormControlLabel, Table } from '@material-ui/core';
import moment from 'moment';
import {
  SwitchStyle,
  useStyles as ClientFormStyles
} from './ClientFormStyles';
import { useFormStyles } from 'hooks/useFormStyles';
import { useClientForm } from './useClientForm';
import { messages } from './ClientFormMessages';
import { useIntlMessages } from 'hooks/useIntlMessages';
import UserImageInput from 'components/Inputs/UserImageInput';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import {CheckboxGroup} from './components/CheckboxGroups';
import { useTheme } from 'hooks/useTheme';
import CancelOkModal from 'components/CancelOkModal';

export const ClientForm = ({
  clientId,
  visible,
  onClose,
  onAccept
}) => {
  const { currentTheme } = useTheme();
  const msgs = useIntlMessages(messages);
  const clientFormStyles = ClientFormStyles({currentTheme});
  const formClasses = useFormStyles();
  const {
    loadImageClient,
    updatePermisoValue,
    permsValue,
    finallyPermsOptions,
    formik,
    showMessageError,
    setShowMessageError,
    messageErrorTittle,
    messageErrorBody,
    isDisabled
  } = useClientForm({ clientId, onAccept });
  
  return (
    <DrawerModal
      visible={visible}
      onClose={onClose}
      onAccept={(e)=>{formik.submitForm(e)}}
      title={clientId == 0 ? msgs.titleCreate : msgs.titleEdit}
      className={clientFormStyles.root}
      disabledAccept={isDisabled}
      useScroll={true}
    >
      <CancelOkModal
        visible={showMessageError}
        onCancel={()=>{setShowMessageError(false)}}
        onAccept={()=>{setShowMessageError(false)}}
        title={messageErrorTittle}
        text={messageErrorBody}
      />

      <h2 className={clientFormStyles.subtitleText}>
        {msgs.subtitleText}
      </h2>

      <h2 className={clientFormStyles.dateCreate}>
        {msgs.activated_on}
        &nbsp;&nbsp;
        {moment(formik.values.activated_on).format('DD/MM/YYYY')}
      </h2>

      <h2 className={clientFormStyles.state}>
        {msgs.stateClientText} 
        <FormControlLabel
          control={
            <SwitchStyle
              checked={formik.values.is_active}
              onChange={formik.handleChange}
              name={'is_active'}
            />
          }
          label={
            <h2 className={clientFormStyles.switchLabel}>
              {formik.values.is_active ? "Activado" : "Desactivado"}
            </h2>
          }
        />
      </h2>

      <UserImageInput
        name="user_image"
        label={msgs.logoTitle}
        limitMB={5}
        message={
          msgs.noFile ||
          msgs.maxSizeImage ||
          msgs.invalidTypeImage
        }
        value={formik.values.user_image}
        onChange={loadImageClient}
      />
      
      <br></br>
      <h2 className={clientFormStyles.subtitle}>
        {msgs.dataTitle}
      </h2>
      <TextField
        label={msgs.dataName}
        name="name"
        placeholder="Ej.Razón Social"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        helperText={formik.touched.name && formik.errors.name}
        className={formClasses.textField}
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      <TextField
        label={msgs.dataId}
        name="nestle_id"
        placeholder="Ej.123456"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        helperText={formik.touched.nestle_id && formik.errors.nestle_id}
        className={formClasses.textField}
        onChange={formik.handleChange}
        value={formik.values.nestle_id}
      />
      <TextField
        label={msgs.dataName_contact}
        name="name_contact"
        placeholder="Ej. Julian Martínez Pérez"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        helperText={formik.touched.name_contact && formik.errors.name_contact}
        className={formClasses.textField}
        onChange={formik.handleChange}
        value={formik.values.name_contact}
      />
      <TextField
        label={msgs.dataEmail}
        name="email"
        placeholder="Ej. correo@dominio.com"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        helperText={formik.touched.email && formik.errors.email}
        className={formClasses.textField}
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <TextField
        label={msgs.dataPhone}
        name="phone"
        placeholder="Ej. 5500000000"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        helperText={formik.touched.phone && formik.errors.phone}
        className={formClasses.textField}
        onChange={formik.handleChange}
        value={formik.values.phone}
      />
      <br></br>
      <br></br>
      <h2 className={clientFormStyles.subtitle}>
        {msgs.permissionsTitle}
      </h2>
      <h2 className={clientFormStyles.subtitleText}>
        {msgs.permissionsSubtitle}
      </h2>
      <FormControl component="fieldset">
        <FormGroup aria-label="position" className={clientFormStyles.switchLabel} row>
          <CheckboxGroup 
            values={permsValue}
            options={finallyPermsOptions}
            onCheck={updatePermisoValue}
          />
        </FormGroup>
      </FormControl>

      <h2 className={clientFormStyles.subtitleText}>
        {msgs.permissionsNote}
      </h2>
    </DrawerModal>
  );
};
