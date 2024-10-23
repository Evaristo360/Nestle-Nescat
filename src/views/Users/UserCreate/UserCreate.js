import React, { useState, useEffect } from 'react';
import defaultImg from 'assets/img/user_create/user_default2.png';
import useApi from './api';
import { style } from './ProfileStyles.css';
import * as yup from 'yup';
import { intlExt } from 'providers/intlExt';
import { useApiErrorMsg } from 'hooks/useApiErrorMsg';
import { messages as formMessages } from './ProfileMessages';
import { checkboxOptions } from './data';
import _ from 'lodash-es';
import {
  updateUser,
  createUser,
  getUser,
  getUserImage
} from 'providers/api/requests/user';
import { useIntl } from 'react-intl';
import { messagesintl } from '../messages';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import UserImageInput from 'components/Inputs/UserImageInput';
import Button from 'components/Button';
import { Grid, Drawer, TextField } from '@material-ui/core';
import CheckboxGroups from './components/CheckboxGroups';
import { useMyInfo } from 'hooks/useMyInfo';
import { useGlobalApiError } from 'hooks/useGlobalApiError';
import CancelOkModal from 'components/CancelOkModal';
import { useFormik } from 'formik';
import { roles, role_names } from 'providers/role';

export const initialData = {
  photo: {
    name: '',
    size: 0,
    file: null,
    url: defaultImg
  },
  perms: checkboxOptions.map((option) => ({
    name: option.name,
    checked: false
  })),
  email: '',
  name: '',
  phone: ''
};

const requiredMsg = intlExt.formatMessage(formMessages.required);

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[aA-zZ\s]+$/, intlExt.formatMessage(formMessages.onlyLetters))
    .max(60)
    .required(requiredMsg),
  email: yup
    .string()
    .email(intlExt.formatMessage(formMessages.invalidEmail))
    .max(50)
    .required(requiredMsg),
  phone: yup
    .string()
    .matches(/^\d{10}/, {
      message: 'El numero de telefono es invalido',
      excludeEmptyString: true
    })
    .min(10, intlExt.formatMessage(formMessages.telLength))
    .required(requiredMsg),
  photo: yup.object().shape({
    size: yup
      .number()
      .max(5000000, intlExt.formatMessage(formMessages.bigSize)),
    type: yup
      .string()
      .oneOf(
        ['image/jpg', 'image/png', 'image/gif', 'image/jpeg'],
        intlExt.formatMessage(formMessages.invalidType)
      )
  }),
  perms: yup.array(
    yup.object().shape({
      name: yup.string().required(),
      checked: yup.boolean().required()
    })
  )
});

const getFinalPerms = (arrays, compare, object) => {
  var array = [];
  var result = [];

  for (var i = 0; i < arrays.length; i++) {
    for (var j = 0; j < compare.length; j++) {
      if (arrays[i] === compare[j]) {
        if (object[compare[j]]) {
          array.push(arrays[i]);
        }
      }
    }
  }

  array.map((name, index) => {
    let perm = {};

    perm.name = name;
    perm.checked = false;

    result.push(perm);
  });

  return result;
};

export const UserCreate = ({ visible, onClose, userId }) => {
  const isEdit = Boolean(userId);
  const classes = style();
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useMyInfo();
  const apiError = useGlobalApiError();
  const apiErrorHandler = useApiErrorMsg();
  const { getPerms } = useApi();
  const intl = useIntl();
  const [roleName, setRoleName] = useState('');
  const [saveroleID, setSaveRoleID] = useState(3);
  const formik = useFormik({
    initialValues: initialData,
    validationSchema,
    onSubmit: async (userValues) => {
      if (!validateAtLeastOnePerm()) {
        formik.setFieldError('perms', 'Seleccione por lo menos un permiso');
        return;
      }
      setIsLoading(true);
      const fd = new FormData();

      fd.set('name', userValues.name);
      fd.set('email', userValues.email);
      fd.set('phone', userValues.phone);
      fd.set('role_id', saveroleID);

      userValues.perms.forEach((perm) => {
        fd.set(perm.name, perm.checked);
      });

      if (userValues.photo.file && userValues.photo.name !== 'default.png') {
        fd.set('user_image', userValues.photo.file);
      }

      apiError.disableForCodes([400, 401]);
      try {
        const response = await createUser(fd);
        handleClose();
      } catch (err) {
        const status = _.get(err, 'response.status', 500);
        const message = _.get(err, 'response.data.message', '');
        const fieldError = _.get(err, 'response.data.error', '');

        if (status < 500) {
          apiErrorHandler.handleApiError(message);
          if (fieldError === 'email') {
            formik.setFieldError(
              'email',
              'Este correo electrónico ya ha sido registrado'
            );
          } else if (fieldError === 'name') {
            formik.setFieldError('name', 'Este usuario ya ha sido registrado');
          }
        }
      } finally {
        apiError.enableForAllCodes();
        setIsLoading(false);
      }
    }
  });

  useEffect(() => {
    loadPerms(userData.role_id);
  }, [visible, userData.role_id]);

  /*
  useEffect(() => {
    loadUser(userId);
  }, [userId]);

  const loadUser = async (userId) => {
    if (!userId) return;

    try {
      const response = await getUser(userId);
      const user = _.get(response, 'items[0]', null);
      if (!user) return;
      console.log({ user });
      formik.setFieldValue('name', user.name);
      formik.setFieldValue('email', user.email);
      formik.setFieldValue('phone', user.phone);
      setRoleName(role_names[user.role_id]);
      setSaveRoleID(user.role_id);
      loadUserImage(user.image_url);
      loadPermValues(user);
    } catch (error) {
      console.log({ error });
    }
  };

  const loadUserImage = async (image_url) => {
    if (!image_url) return;
    try {
      const response = await getUserImage(image_url);
      const image = response.data;
      if (image) {
        formik.setFieldValue('photo', {
          name: image_url,
          file: image,
          size: image.size,
          type: image.type,
          url: defaultImg
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };
  */

  const loadPerms = async (role_id) => {
    if (!role_id) return;
    let initialPerms = [];

    try {
      if (role_id === roles.nestle_admin) {
        setRoleName(formMessages.NestleUser.defaultMessage);
        setSaveRoleID(roles.nestle_operator);
        initialPerms = await getPerms(`/role/${roles.nestle_operator}`);
      } else if (role_id === roles.client_admin) {
        setRoleName(formMessages.clientUser.defaultMessage);
        setSaveRoleID(roles.client_operator);
        initialPerms = await getPerms(`/role/${roles.client_operator}`);
      } else {
        setRoleName(formMessages.NestleUser.defaultMessage);
        setSaveRoleID(roles.nestle_operator);
        initialPerms = await getPerms(`/role/${roles.nestle_operator}`);
      }
      const userPerms = Object.keys(userData);

      const perms = getFinalPerms(
        initialPerms.permissionList,
        userPerms,
        userData
      );
      formik.setFieldValue('perms', perms);
    } catch (error) {
      console.log({ error });
    }
  };

  const validateAtLeastOnePerm = () =>
    Boolean(formik.values.perms.find((perm) => perm.checked));

  const handleChange = (event) => {
    const { name, value, type } = event.target;

    if (type === 'file') {
      const file = event.target.files[0];
      formik.setFieldValue(name, {
        name: file.name,
        size: file.size,
        type: file.type,
        file: file,
        url: defaultImg
      });
    } else {
      formik.setFieldTouched(name, true);
      formik.setFieldValue(name, value);
    }
  };

  function onChangeCheckBox(e) {
    var newPerms = formik.values.perms.map((perm) => ({
      name: perm.name,
      checked: perm.name === e.target.name ? !perm.checked : perm.checked
    }));
    formik.setFieldValue('perms', newPerms);
  }

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  const imageMessage =
    _.get(formik, 'errors.photo.type') ||
    _.get(formik, 'errors.photo.size', '');

  return (
    <Drawer
      anchor="right"
      open={visible}
      onClose={handleClose}
      className={classes.root}
    >
      <CancelOkModal
        visible={apiErrorHandler.visible}
        onCancel={apiErrorHandler.handleClose}
        onAccept={apiErrorHandler.handleClose}
        title={apiErrorHandler.title}
        text={apiErrorHandler.message}
      />

      <h1 className={classes.title}>{`${
        isEdit ? 'Editar' : 'Nuevo'
      } usuario`}</h1>
      <h2 className={classes.subtitle}>
        Completa la siguiente información para generar un nuevo registro de
        usuario.
      </h2>
      <h3 className={classes.rol}>Rol Asignado:{roleName}</h3>
      <UserImageInput
        name="photo"
        label="Imagen"
        limitMB={5}
        message={imageMessage}
        value={formik.values.photo.file || ''}
        onChange={handleChange}
        noPic={!Boolean(formik.values.photo.file)}
      />

      <h2 className={classes.data}>Datos</h2>
      <TextField
        label="Nombre completo"
        name="name"
        placeholder="Ej. Juan Manuel Ramirez Martinez"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        helperText={formik.touched.name && formik.errors.name}
        className={classes.textField}
        onChange={handleChange}
        value={formik.values.name}
      />

      <TextField
        label="Correo electronico"
        name="email"
        placeholder="Ej. correo@dominio.com"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        className={classes.textField}
        helperText={formik.touched.email && formik.errors.email}
        onChange={handleChange}
        value={formik.values.email}
      />

      <TextField
        label="Telefono de contacto"
        name="phone"
        placeholder="Ej. 5500000000"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        className={classes.textField}
        helperText={formik.touched.phone && formik.errors.phone}
        onChange={handleChange}
        value={formik.values.phone}
      />

      <h2 className={classes.permissions}>Permisos</h2>
      <h2 className={classes.legend}>
        Completa la siguiente información para generar un nuevo registro de
        usuario.
      </h2>
      <FormControl component="fieldset" className={classes.formGroup}>
        <FormGroup aria-label="position" row className={classes.formGroup}>
          <CheckboxGroups
            label={intl.formatMessage(messagesintl.perms)}
            subLabel={intl.formatMessage(messagesintl.permsPH)}
            values={formik.values.perms}
            options={checkboxOptions}
            onCheck={onChangeCheckBox}
          />
        </FormGroup>
      </FormControl>

      <p className={classes.error}>{formik.errors.perms}</p>

      <Grid
        container
        justify="flex-start"
        alignItems="center"
        style={{ marginTop: '2rem' }}
      >
        <Button
          className={classes.saveButton}
          onClick={formik.handleSubmit}
          disabled={!formik.isValid || isLoading}
        >
          Guardar
        </Button>
        <Button className={classes.cancelButton} onClick={handleClose}>
          Cancelar
        </Button>
      </Grid>
    </Drawer>
  );
};
