import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Button from 'components/Button';
import { TextField, FormControl, MenuItem } from '@material-ui/core';
import InputColor from './components/InputColor';
import { useTheme } from 'hooks/useTheme';
import DrawerModal from 'components/DrawerModal';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { formMessages } from 'providers/formMessages';
import { intlExt } from 'providers/intlExt';
import { useFormStyles } from 'hooks/useFormStyles';
import { useInputImageFormik } from 'hooks/useInputImageFormik';
import useAxios from 'hooks/useAxios';
import _ from 'lodash';
import { useItems } from 'hooks/useItems';
import { useGlobalApiError } from 'hooks/useGlobalApiError';

const validationSchema = Yup.object().shape({
  name: Yup.string().required(intlExt.formatMessage(formMessages.required)),
  resolution_id: Yup.number().required(
    intlExt.formatMessage(formMessages.required)
  ),
  color: Yup.string().required(intlExt.formatMessage(formMessages.required)),
  scene_image: Yup.string(),
  scene_image_type: Yup.string().oneOf(
    ['image/jpg', 'image/png', 'image/gif', 'image/jpeg'],
    intlExt.formatMessage(formMessages.invalidImageType)
  ),
  scene_image_size: Yup.number().max(5000000, 'El archivo es muy grande')
});

const initialState = {
  name: '',
  resolution_id: '',
  color: '#007CBA',
  scene_image: '',
  scene_image_file: '',
  scene_image_type: '',
  scene_image_size: ''
};

export const SceneEdit = ({ showModal = false, onClose, id, onAccept }) => {
  const classes = useFormStyles();
  const allResolutions = useItems({ endpoint: '/resolution/list' });
  const [loading, setLoading] = useState(false);
  const { currentTheme } = useTheme();
  const { formatMessage } = useIntl();
  const intl = useIntl();
  const axios = useAxios();
  const globalError = useGlobalApiError();

  useEffect(() => {
    loadScene(id);
  }, [id]);

  const loadScene = async (id) => {
    if (id === 0) {
      formik.setValues(initialState);
    } else {
      try {
        setLoading(true);
        const response = await axios.get(`/scene/${id}`);
        const scene = _.get(response, 'data.items[0]', {});
        if (scene.image_url) {
          let fileImage = await getFile(scene.image_url);
          formik.setValues({
            ...initialState,
            name: scene.name,
            color: scene.color,
            resolution_id: scene.resolution_id,

            scene_image: fileImage.name,
            scene_image_size: fileImage.size,
            scene_image_type: fileImage.type,
            scene_image_file: fileImage
          });
        } else {
          formik.setValues({
            ...initialState,
            name: scene.name,
            color: scene.color,
            resolution_id: scene.resolution_id
          });
        }
      } catch (error) {
        console.log({ error });
      } finally {
        setLoading(false);
      }
    }
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema,
    onSubmit: async (values) => {
      if(loading) return;
      const fd = new FormData();
      setLoading(true);
      fd.append('name', values.name);
      fd.append('resolution_id', values.resolution_id);
      fd.append('color', `${values.color}`.toUpperCase());
      if (values.scene_image_file !== '')
        fd.set('scene_image', values.scene_image_file);

      try {
        globalError.disableForCodes([409]);
        let response;

        if (id) {
          response = await axios.patch(`/scene/${id}`, fd);
        } else {
          response = await axios.post('/scene', fd);
          formik.resetForm();
        }

        onClose();
      } catch (error) {
        if (error.response.status === 409) {
          formik.setFieldError(
            'scene_image',
            'La imagen seleccionada no coincide con el tamaño de la resolución'
          );
        }
        console.log({ error });
      } finally {
        globalError.enableForAllCodes();
        setLoading(false);
      }
    }
  });

  const { imageRef, selectImage, onChangeInputFile } = useInputImageFormik({
    formik
  });

  const getFile = async (urlImage) => {
    let image = null;
    try {
      let resImage = await axios.get(urlImage, { responseType: 'blob' });
      image = new File([resImage.data], `scene_${id}`, {
        type: resImage.data.type,
        size: resImage.data.size
      });
    } catch (error) {
      console.log('=>', { error });
    }

    return image;
  };

  return (
    <DrawerModal
      title={id ? 'Editar escena' : 'Agregar escena'}
      visible={showModal}
      onClose={onClose}
      onAccept={formik.handleSubmit}
      disabledAccept={!loading && formik.isValid}
    >
      <TextField
        label="Nombre de la escena (1-50 caracteres)"
        name="name"
        placeholder="Ej. Mis mañanas Nestlé"
        variant="filled"
        margin="dense"
        className={classes.textField}
        InputProps={{ disableUnderline: true }}
        helperText={formik.touched.name && formik.errors.name}
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      <FormControl style={{ marginTop: '1rem' }}>
        <p className={classes.description}>
          Seleccione la resolución en la que debe diseñarse esta diapositiva.
        </p>
        <TextField
          select
          label="Resolución"
          name="resolution_id"
          placeholder="Seleccionar"
          variant="filled"
          margin="dense"
          InputProps={{ disableUnderline: true }}
          helperText={
            formik.touched.resolution_id && formik.errors.resolution_id
          }
          className={classes.textField}
          onChange={formik.handleChange}
          value={formik.values.resolution_id}
        >
          {allResolutions.map((r, index) => (
            <MenuItem value={r.id} key={index}>
              {`${r.resolution}`}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
      <div className={classes.inputCont} style={{ marginTop: '1rem' }}>
        <h1 className={classes.title}> Fondo / Background </h1>
        <p className={classes.description}>Seleccione el color de fondo</p>
        <InputColor
          name="color"
          value={formik.values.color}
          onChange={({ name, value }) => {
            formik.handleChange({ target: { name, value } });
          }}
        />
      </div>
      <input
        type="file"
        name="scene_image"
        className={classes.inputHidden}
        ref={imageRef}
        onChange={onChangeInputFile}
      />
      <FormControl style={{ marginTop: '1rem' }}>
        <p className={classes.description}>Seleccionar imagen de fondo</p>
        <TextField
          label="Imagen de fondo"
          disabled
          name="scene_image"
          placeholder="Imagen de fondo"
          variant="filled"
          margin="dense"
          className={classes.textField}
          InputProps={{ disableUnderline: true }}
          helperText={
            formik.errors.scene_image ||
            formik.errors.scene_image_type ||
            formik.errors.scene_image_size
          }
          value={formik.values.scene_image}
        />
      </FormControl>
      <Button secondary onClick={selectImage} style={{ marginTop: '1rem' }}>
        Agregar nueva imagen de fondo
      </Button>
    </DrawerModal>
  );
};
