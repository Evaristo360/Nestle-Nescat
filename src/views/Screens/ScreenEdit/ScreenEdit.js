import React, { useEffect } from 'react';
import { TextField, FormControl, MenuItem } from '@material-ui/core';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import DrawerModal from 'components/DrawerModal';
import { useStyles } from './ScreenEditStyles';
import { useStyles as useProfileStyles } from 'views/Profiles';
import useAxios from 'hooks/useAxios';
import { formMessages } from 'providers/formMessages';
import { intlExt } from 'providers/intlExt';
import { useFormStyles } from 'hooks/useFormStyles';

const schemaScreenEdit = Yup.object().shape({
  name: Yup.string().required(intlExt.formatMessage(formMessages.required)),
  is_authorized: Yup.string().required(
    intlExt.formatMessage(formMessages.required)
  ),
  profile: Yup.string().required(intlExt.formatMessage(formMessages.required))
});

const ScreenEdit = ({ screenData = {}, visible, onClose, onAccept }) => {
  const axios = useAxios();
  const classes = useStyles();
  const formClasses = useFormStyles();
  const formik = useFormik({
    initialValues: {
      name: screenData.name,
      is_authorized: 0,
      profile: ''
    },
    validationSchema: schemaScreenEdit,
    onSubmit: async (values) => {
      //console.log({ values });
      const data = {
        name: values.name,
        profile: values.profile,
        is_authorized: Boolean(values.is_authorized)
      };

      try {
        const response = await axios.patch(`/screen/${screenData.id}`, data);
        //console.log({ response });

        onAccept();
      } catch (error) {
        console.log({ error });
      }
    }
  });

  useEffect(() => {
    formik.setValues({
      name: screenData.name || '',
      is_authorized: screenData.is_authorized || 0,
      profile: screenData.profile || ''
    });
  }, [screenData]);

  return (
    <DrawerModal
      visible={visible}
      onClose={onClose}
      onAccept={formik.handleSubmit}
      title="Editar pantalla"
      className={classes.root}
      disabledAccept={true}
    >
      <TextField
        label="Nombre"
        name="name"
        placeholder="Nombre pantalla"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        helperText={formik.touched.name && formik.errors.name}
        className={formClasses.textField}
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      <FormControl style={{ marginTop: '1rem' }}>
        <p className={formClasses.subLabel}>Autorización</p>
        <p className={formClasses.description}>
          Autorización para conectarse al servidor y buscar contenido
        </p>
        <TextField
          select
          label="Autorizar"
          name="is_authorized"
          placeholder="Seleccionar"
          variant="filled"
          margin="dense"
          InputProps={{ disableUnderline: true }}
          helperText={
            formik.touched.is_authorized && formik.errors.is_authorized
          }
          className={formClasses.textField}
          onChange={formik.handleChange}
          value={formik.values.is_authorized}
        >
          <MenuItem value={1}>Si</MenuItem>
          <MenuItem value={0}>No</MenuItem>
        </TextField>
      </FormControl>
      <FormControl>
        <p className={formClasses.subLabel}>Perfil</p>
        <p className={formClasses.description}>
          Seleccionar el perfil de visualización que tendrá la pantalla.
        </p>
        <TextField
          select
          label="Perfil"
          name="profile"
          placeholder="Seleccionar"
          variant="filled"
          margin="dense"
          InputProps={{ disableUnderline: true }}
          helperText={formik.touched.profile && formik.errors.profile}
          className={formClasses.textField}
          onChange={formik.handleChange}
          value={formik.values.profile}
        >
          <MenuItem value="Linux">Linux</MenuItem>
          <MenuItem value="Windows">Windows</MenuItem>
        </TextField>
      </FormControl>
    </DrawerModal>
  );
};

export { ScreenEdit };
