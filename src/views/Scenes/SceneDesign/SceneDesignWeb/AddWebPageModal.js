import React, { useEffect } from 'react';
import DrawerModal from 'components/DrawerModal';
import _ from 'lodash';
import { useWebModalStyles } from './AddWebModalStyles.css';
import { useFormStyles } from 'hooks/useFormStyles';
import { TextField } from '@material-ui/core';
import useAxios from 'hooks/useAxios';
import Checkbox from 'components/Checkbox';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { intlExt } from 'providers/intlExt';
import { formMessages } from 'providers/formMessages';

const validationSchema = Yup.object().shape({
  url: Yup.string()
    .url('Url inválida')
    .required(intlExt.formatMessage(formMessages.required)),
  name: Yup.string().required(intlExt.formatMessage(formMessages.required)),
  duration: Yup.number(),
  scale_percentage: Yup.number().required(
    intlExt.formatMessage(formMessages.required)
  )
});

const AddWebPageModal = ({ scene_id, id, onClose, onAccept }) => {
  const isEdit = Boolean(id);
  const axios = useAxios();
  const addWebRequest = (data) => axios.post(`/advertisements/web`, data);
  const updateWebRequest = (id, data) =>
    axios.patch(`/advertisements/web/${id}`, data);
  const classes = useWebModalStyles();
  const formClasses = useFormStyles();
  const formik = useFormik({
    initialValues: {
      url: '',
      name: '',
      set_duration: false,
      duration: 0,
      scale_percentage: 0,
      clear_background: false
    },
    validationSchema,
    onSubmit: async (values) => {
      const data = {
        scene_id,
        url: values.url,
        name: values.name,
        set_duration: values.set_duration,
        scale_percentage: values.scale_percentage,
        clear_background: values.clear_background
      };

      if (values.set_duration) data.duration = values.duration;

      try {
        let response;

        if (isEdit) {
          response = await updateWebRequest(id, data);
        } else {
          response = await addWebRequest(data);
        }

        const item = _.get(response, 'data.result.items[0]', {});

        onAccept({ ...item, media_type: 'web', isEdit });
      } catch (error) {
        console.log({ error });
      }
    }
  });

  useEffect(() => {
    loadWeb(id);
  }, [scene_id, id]);

  const loadWeb = async (id) => {
    if (!id) return;
    try {
      const response = await axios.get(`/advertisements/web/${id}`);
      const item = _.get(response, 'data.result.items[0]', {});

      formik.setValues({
        url: item.url,
        name: item.name,
        set_duration: item.set_duration,
        duration: item.duration,
        scale_percentage: item.scale_percentage,
        clear_background: item.clear_background
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const handleChangeCheckbox = (event) => {
    formik.handleChange({
      target: {
        name: Object.keys(event)[0],
        value: event[Object.keys(event)[0]]
      }
    });
  };

  const title = isEdit ? 'Editar página web' : 'Agregar página web';

  return (
    <DrawerModal
      visible
      title={title}
      className={classes.root}
      onClose={onClose}
      onAccept={formik.handleSubmit}
      disabledAccept={formik.isValid}
    >
      <TextField
        label="Enlace"
        name="url"
        placeholder="Ej. www.dominio.com"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        helperText={formik.touched.url && formik.errors.url}
        className={formClasses.textField}
        onChange={formik.handleChange}
        value={formik.values.url}
      />

      <TextField
        label="Nombre"
        name="name"
        placeholder="Ej. Mi sitio 1"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        helperText={formik.touched.name && formik.errors.name}
        className={formClasses.textField}
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      <h1 className={formClasses.title} style={{ marginTop: '1rem' }}>
        Duración
      </h1>
      <p className={formClasses.description}>
        Seleccione para proporcionar una duración específica
      </p>

      <div className={classes.checkboxCont}>
        <Checkbox
          name="set_duration"
          value={formik.values.set_duration}
          onChange={handleChangeCheckbox}
          style={{ marginRight: '1rem' }}
        />
        <p className={formClasses.subLabel}>¿Establecer una duración?</p>
      </div>

      {formik.values.set_duration ? (
        <TextField
          type="number"
          label="Duración"
          name="duration"
          placeholder="Duración en segundos"
          variant="filled"
          margin="dense"
          InputProps={{ disableUnderline: true }}
          helperText={formik.touched.duration && formik.errors.duration}
          className={formClasses.textField}
          onChange={formik.handleChange}
          value={formik.values.duration}
        />
      ) : null}

      <h1 className={formClasses.title} style={{ marginTop: '2rem' }}>
        Escalado
      </h1>
      <p className={formClasses.description}>
        Indique el porcentaje de zoom para aplicar al sitio web (0 -100)
      </p>
      <TextField
        type="number"
        label="Escalado"
        name="scale_percentage"
        placeholder="Ej. 30"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        helperText={
          formik.touched.scale_percentage && formik.errors.scale_percentage
        }
        className={formClasses.textField}
        onChange={formik.handleChange}
        value={formik.values.scale_percentage}
      />
      <div className={classes.checkboxCont}>
        <Checkbox
          name="clear_background"
          value={formik.values.clear_background}
          onChange={handleChangeCheckbox}
          style={{ marginRight: '1rem' }}
        />
        <p className={formClasses.subLabel}>Habilitar fondo transparente</p>
      </div>

      <p className={formClasses.description} style={{ marginTop: '1rem' }}>
        Si el sitio web tiene el fondo transparente se mostrará dicha
        transparencia con respecto al fondo de la pantalla.
      </p>
    </DrawerModal>
  );
};

export default AddWebPageModal;
