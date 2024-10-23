import { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { messages } from '../messages';
import { TextField } from '@material-ui/core';
import { Switch } from 'components/Switch';
import { useFormStyles } from 'hooks/useFormStyles';
import DrawerModal from 'components/DrawerModal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { formMessages } from 'providers/formMessages';
import {
  createResolution,
  getResolutionById,
  updateResolution
} from 'providers/api/requests/resolutions';
import { intlExt } from 'providers/intlExt';
import lodash from 'lodash';
import { useGlobalApiError } from 'hooks/useGlobalApiError';

const initialValues = {
  resolution: '',
  width: '',
  height: '',
  is_active: true
};

const validationSchema = Yup.object().shape({
  resolution: Yup.string().required(
    intlExt.formatMessage(formMessages.required)
  ),
  width: Yup.number()
    .transform((value) => (isNaN(value) ? -1 : Number(value)))
    .positive(intlExt.formatMessage(formMessages.invalid))
    .required(intlExt.formatMessage(formMessages.required)),
  height: Yup.number()
    .transform((value) => (isNaN(value) ? -1 : Number(value)))
    .positive(intlExt.formatMessage(formMessages.invalid))
    .required(intlExt.formatMessage(formMessages.required)),
  is_active: Yup.boolean().required(
    intlExt.formatMessage(formMessages.required)
  )
});

const ResolutionEditModal = ({ showModal = false, onClose, id }) => {
  const isEdit = Boolean(id);
  const apiError = useGlobalApiError();
  const classes = useFormStyles();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      apiError.disableForCodes([400]);
      const data = {
        resolution: values.resolution,
        width: Number(values.width),
        height: Number(values.height),
        is_active: values.is_active
      };
      try {
        let response = {};
        if (isEdit) {
          response = await updateResolution(id, data);
        } else {
          response = await createResolution(data);
        }
        if (response.error) {
          handleResponseError(response.error);
        } else {
          onClose();
        }
      } catch (error) {
        console.log({ error });
      } finally {
        apiError.enableForAllCodes();
      }
    }
  });
  const { formatMessage } = useIntl();
  const intl = useIntl();

  useEffect(() => {
    loadResolution(id);
    return () => formik.resetForm();
  }, [id]);

  const loadResolution = async (id) => {
    if (!id) return;
    try {
      const response = await getResolutionById(id);
      const resolution = lodash.get(response, 'items[0]', initialValues);
      formik.setFieldValue('resolution', resolution.resolution);
      formik.setFieldValue('width', resolution.width);
      formik.setFieldValue('height', resolution.height);
      formik.setFieldValue('is_active', resolution.is_active);
    } catch (error) {
      console.log({ error });
    }
  };

  const handleResponseError = (error) => {
    if (error === 'resolution') {
      formik.setFieldError(
        'resolution',
        'Ya existe una resolución con este nombre'
      );
    }
  };

  function onChangeSwitch(value) {
    formik.setFieldValue('is_active', value);
  }

  return (
    <DrawerModal
      title={
        isEdit
          ? intl.formatMessage(messages.titleEdit)
          : intl.formatMessage(messages.titleCreate)
      }
      visible={showModal}
      onClose={onClose}
      onAccept={formik.handleSubmit}
      disabledAccept={formik.isValid}
    >
      <TextField
        label="Nombre de la resolución"
        name="resolution"
        placeholder="Ej. 1080 HD (landscape)"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        helperText={formik.errors.resolution}
        className={classes.textField}
        onChange={formik.handleChange}
        value={formik.values.resolution}
      />

      <TextField
        label="Ancho"
        name="width"
        placeholder="Ej. 2000px"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        className={classes.textField}
        helperText={formik.errors.width}
        onChange={formik.handleChange}
        value={formik.values.width}
      />
      <TextField
        label="Alto"
        name="height"
        placeholder="Ej. 2000px"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        className={classes.textField}
        helperText={formik.errors.height}
        onChange={formik.handleChange}
        value={formik.values.height}
      />

      <div className={classes.status_title}>
        ¿Activar resolución para su uso?
      </div>
      <Switch
        onSwitch={onChangeSwitch}
        isActive={formik.values.is_active}
        legends={[formatMessage(messages.activate)]}
      />
    </DrawerModal>
  );
};

export default ResolutionEditModal;
