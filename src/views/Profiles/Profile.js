import React, { useReducer, useState, useEffect } from 'react';
import { Grid, Drawer, TextField } from '@material-ui/core';
import { style } from './ProfileStyles.css';
import ProfileImageInput from 'components/Inputs/ProfileImageInput';
import Button from 'components/Button';
import { useFormStyles } from 'hooks/useFormStyles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import _ from 'lodash';
import CancelOkModal from 'components/CancelOkModal';
import { useProfiles } from './useProfiles';

const Profile = ({ visible, onClose }) => {
  const classes = style();
  const formClasses = useFormStyles();
  const {
    formik,
    promiseModal,
    handleChangePhoto,
    showCurrentPassword,
    showNewPassword,
    showConfirmPassword,
    setShowCurrentPassword,
    setShowNewPassword,
    setShowConfirmPassword,
    handleMouseDownPassword,
    isLoading,
    setIsLoading
  } = useProfiles({ visible, onClose });
  return (
    <Drawer
      anchor="right"
      open={visible}
      onClose={onClose}
      className={classes.root}
    >
      <CancelOkModal
        title={promiseModal.title}
        text={promiseModal.text}
        onAccept={promiseModal.onAccept}
        visible={promiseModal.showModal}
      />
      <h1 className={classes.title}>Mi perfil</h1>
      <TextField
        label="Nombre completo"
        name="name"
        placeholder="Ej. Juan Manuel Ramirez Martinez"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        helperText={formik.touched.name && formik.errors.name}
        className={formClasses.textField}
        onChange={formik.handleChange}
        value={formik.values.name}
      />

      <TextField
        label="Usuario ID"
        placeholder="Ej. JRamirez"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        className={formClasses.disable}
        disabled
        value={formik.values.id}
      />

      <TextField
        label="Correo electrónico"
        name="email"
        placeholder="Ej. correo@dominio.com"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        className={formClasses.textField}
        onChange={formik.handleChange}
        value={formik.values.email}
        helperText={formik.touched.email && formik.errors.email}
      />

      {/* <div className={classes.margin}>
        <ImageInput
          name="user_image"
          label="Imagen"
          limitMB={5}
          message={
            messages.user_image ||
            messages.user_image_size ||
            messages.user_image_type
          }
          value={userValues.user_image}
          onChange={handleChange}
        />
      </div> */}
      <div className={classes.margin}>
        <ProfileImageInput
          name="user_image"
          label="Imagen"
          limitMB={5}
          message={
            (formik.touched.user_image && formik.errors.user_image) ||
            (formik.touched.user_image_size && formik.errors.user_image_size) ||
            (formik.touched.user_image_type && formik.errors.user_image_type)
          }
          value={formik.values.user_image}
          onChange={handleChangePhoto}
        />
      </div>

      <h2 className={classes.permissions}>Acceso</h2>

      <TextField
        label="Contraseña actual"
        type={showCurrentPassword ? 'text' : 'password'}
        name="currentPassword"
        variant="filled"
        margin="dense"
        autoComplete="off"
        className={classes.passTextField}
        value={formik.values.currentPassword}
        onChange={formik.handleChange}
        helperText={formik.errors.currentPassword}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => {
                  setShowCurrentPassword(!showCurrentPassword);
                }}
                onMouseDown={handleMouseDownPassword}
              >
                {showCurrentPassword ? (
                  <Visibility style={{ color: '#FFFFFF80' }} />
                ) : (
                  <VisibilityOff style={{ color: '#FFFFFF80' }} />
                )}
              </IconButton>
            </InputAdornment>
          ),
          disableUnderline: true
        }}
      />

      <TextField
        label="Nueva contraseña"
        type={showNewPassword ? 'text' : 'password'}
        name="newPassword"
        variant="filled"
        margin="dense"
        className={classes.passTextField}
        value={formik.values.newPassword}
        helperText={formik.errors.newPassword}
        onChange={formik.handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => {
                  setShowNewPassword(!showNewPassword);
                }}
                onMouseDown={handleMouseDownPassword}
              >
                {showNewPassword ? (
                  <Visibility style={{ color: '#FFFFFF80' }} />
                ) : (
                  <VisibilityOff style={{ color: '#FFFFFF80' }} />
                )}
              </IconButton>
            </InputAdornment>
          ),
          disableUnderline: true
        }}
      />

      <TextField
        label="Confirmar nueva contraseña"
        type={showConfirmPassword ? 'text' : 'password'}
        name="confirmPassword"
        variant="filled"
        margin="dense"
        className={classes.passTextField}
        value={formik.values.confirmPassword}
        helperText={formik.errors.confirmPassword}
        onChange={formik.handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => {
                  setShowConfirmPassword(!showConfirmPassword);
                }}
                onMouseDown={handleMouseDownPassword}
              >
                {showConfirmPassword ? (
                  <Visibility style={{ color: '#FFFFFF80' }} />
                ) : (
                  <VisibilityOff style={{ color: '#FFFFFF80' }} />
                )}
              </IconButton>
            </InputAdornment>
          ),
          disableUnderline: true
        }}
      />

      <Grid
        container
        justify="flex-start"
        alignItems="center"
        style={{ marginTop: '2rem' }}
      >
        <Button
          onClick={(e)=>{
            setIsLoading(true)
            formik.submitForm()
          }}
          className={classes.saveButton}
          disabled={isLoading ? true : !formik.isValid}
        >
          Guardar
        </Button>
        <Button onClick={onClose} className={classes.cancelButton}>
          Cancelar
        </Button>
      </Grid>
    </Drawer>
  );
};

export { Profile };
