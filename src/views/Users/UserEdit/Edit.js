import React, { useReducer, useState, useEffect } from 'react';
import default_image from 'assets/img/octopy-isotipo.png';
import useModal from '../../../hooks/useModal';
import usePerms from './hooks/usePerms';
import useLocalStorage from 'hooks/useLocalStorage';
import useApi from './api';
import { useStyles, SwitchStyle, buttonStyles, style } from './ProfileStyles.css';
import * as yup from 'yup';
import { intlExt } from 'providers/intlExt';
import { messages as formMessages } from './ProfileMessages';
import { useHistory } from 'react-router-dom';
import useHandleData from './hooks/useHandleData';
import useValidation from './hooks/useValidation';
import { checkboxOptions, initialData, initialDataClient, initialDataNestle, initialDataAdminClient } from './data';
import _ from 'lodash-es';

import { useIntl } from 'react-intl';
import { messagesintl } from '../messages';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import UserImageInput from 'components/Inputs/UserImageInput';
import Button from 'components/Button';
import { Grid, Drawer, TextField } from '@material-ui/core';
import CheckboxGroups from './components/CheckboxGroups';
import { useMyInfo } from 'hooks/useMyInfo';
import { config } from 'providers/config';
import { useGlobalApiError } from 'hooks/useGlobalApiError';
import CancelOkModal from 'components/CancelOkModal';

const createInitState = (
  id = 'Loading',
  name = '',
  email = '',
  phone = '',
  user_image = null,
  user_image_size = 0,
  user_image_type = ''
) => ({
  id,
  name,
  email,
  phone,
  user_image,
  user_image_type,
  user_image_size
});

const requiredMsg = intlExt.formatMessage(formMessages.required);

const schemaUser = yup.object().shape({
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
    .matches(/^\d{10}/, { message: 'El numero de telefono es invalido', excludeEmptyString: true })
    .min(10, intlExt.formatMessage(formMessages.telLength))
    .required(requiredMsg),
  user_image_size: yup
    .number()
    .max(5000000, intlExt.formatMessage(formMessages.bigSize)),
  user_image_type: yup
    .string()
    .oneOf(
      ['image/jpg', 'image/png', 'image/gif', 'image/jpeg'],
      intlExt.formatMessage(formMessages.invalidType)
    )
});

const messageReducer = (messages = {}, action) => {
  switch (action.type) {
    case 'add-msg':
      return {
        ...messages,
        [action.name]: action.message
      };
    case 'update-multiple':
      return {
        ...messages,
        ...action.messages
      };
    default:
  }

  return messages;
};

const useMessages = () => {
  const [messages, dispatch] = useReducer(messageReducer, {});
  const addMessage = (name, message) =>
    dispatch({ type: 'add-msg', name, message });
  const updateMultipleMessages = (messages) =>
    dispatch({ type: 'update-multiple', messages });

  return { messages, addMessage, updateMultipleMessages };
};

const validate = (arrays, compare, object) => {
  var array = [];

  for (var i = 0; i < arrays.length; i++) {
    for (var j = 0; j < compare.length; j++) {
      if (arrays[i].name === compare[j]) {
        if (object[compare[j]]) {
          array.push(arrays[i]);
        }
      }
    }
  }
  return array;
};

export const Edit = ({ visible, onClose, userDatas }) => {
  let passid = userDatas.id;
  const { userData } = useMyInfo();
  const apiError = useGlobalApiError();
  const [isValidForm, setIsValidForm] = useState(false);
  const [userValues, setUserValues] = useState(createInitState());
  const [apiErrorMessage, setApiErrorMessage] = useState(false);
  const [apiErrorTitle, setApiErrorTitle] = useState('');
  const { messages, addMessage, updateMultipleMessages } = useMessages();
  const [apiValues, setApiValues] = useState(createInitState());
  const updateUserValues = (name, value) =>
    setUserValues({ ...userValues, [name]: value });
  const updateUserMultipleValues = (values) =>
    setUserValues({ ...userValues, ...values });
  const { getProfilePhoto, getMyInfo, updateMyInfo, resetPassword, updateUser, getFile, doPut, doGet, getPerms } = useApi();
  const { getItem, removeItem } = useLocalStorage();
  const userId = getItem('user_id');
  const { labelsPerms, setPerms, setRol } = usePerms();
  const { title, text, showModal, toggleModal, openModal } = useModal();
  const classes = style();
  const history = useHistory();
  const intl = useIntl();

  const [data, updateData, saveData] = useHandleData(initialData);
  const [alert, updateAlert] = useState({ isVisible: false, message: '' });
  const [dataValidation, validateData] = useValidation();
  const [userEdit, setUserEdit] = useState(false);
  const [roleID, setRoleID] = useState('');
  const [saveroleID, setSaveRoleID] = useState(3);
  const [myPerms, setMyPerms] = useState([]);

  useEffect(() => {
    (async () => {
      if (userDatas.image_url !== undefined) {
        let initialPerms = initialDataNestle;
        let userPerms;

        if (userDatas.image_url !== undefined) userDatas.user_image = await getProfilePhoto(config.siteConfig.apiUrl + '/' + userDatas.image_url, default_image, userData.id);
        
        // let result = await getMyInfo();

        if (userDatas.role_id === 3) {
          setRoleID(formMessages.NestleUser.defaultMessage);
          setSaveRoleID(3);
          initialPerms = initialDataNestle;
          initialPerms = await getPerms(`/role/3`)
        } else if (userDatas.role_id === 4) {
          setRoleID(formMessages.adminClient.defaultMessage);
          setSaveRoleID(4);
          initialPerms = initialDataAdminClient;
          initialPerms = await getPerms(`/role/4`)
        } else if (userDatas.role_id === 2) {
          setRoleID(formMessages.adminNestle.defaultMessage);
          setSaveRoleID(2);
          initialPerms = initialData;
          initialPerms = await getPerms(`/role/2`)
        } else if (userDatas.role_id === 5) {
          setRoleID(formMessages.clientUser.defaultMessage);
          setSaveRoleID(5);
          initialPerms = initialDataClient;
          initialPerms = await getPerms(`/role/5`)
        } else {
          setRoleID(formMessages.adminNestle.defaultMessage);
          setSaveRoleID(1);
          initialPerms = initialData;
          initialPerms = await getPerms(`/role/2`)
        }

        userPerms = Object.keys(userData);
        setMyPerms(Object.keys(userPerms));

        var newPerms = initialPerms.permissionList.map((perm) => ({
          name: perm,
          checked: userDatas[perm.toString()]
        }));

        data.perms = validate(newPerms, userPerms, userData);

        updateData({
          ...data,
          perms: data.perms
        });

        setPerms({
          analytics: userDatas.analytics,
          advertisements: userDatas.advertisements,
          metric: userDatas.metric,
          surveys: userDatas.surveys,
          management: userDatas.management
        });
        setRol(userDatas.role_name);
        delete userDatas.advertisements;
        delete userDatas.management;
        delete userDatas.surveys;
        delete userDatas.use_darkmode;
        delete userDatas.client_surveys;
        delete userDatas.client_advertisements;
        // console.log('userData', userData);
        userDatas.user_image_type = userDatas.user_image.type;
        userDatas.user_image_size = userDatas.user_image.size;
        setApiValues({ ...userValues, ...userDatas });
        setUserValues({ ...userValues, ...userDatas });
      }
    })();
  }, [userDatas]);

  async function resetPass() {
    let password = await doPut(`/resetPassword/${passid}`, {});
  }

  const handleChange = (event) => {
    const { name, value, type } = event.target;

    if (type === 'file') {
      const file = event.target.files[0];

      updateUserMultipleValues({
        [name]: file,
        [`${name}_size`]: file.size,
        [`${name}_type`]: file.type
      });
    } else {
      updateUserValues(name, value);
    }
  };

  const validateSchema = (schema, values) => {
    let validPerm = false;
    try {
      schema.validateSync(values);
      cleanMessages(schema);

      data.perms.forEach((perm) => {
        if (perm.checked) {
          validPerm = true;
        }
      });

      if (!validPerm) {
        throw "Se debe habilitar mínimo un permiso";
        //resolve(false);
      }

      return true;
    } catch (error) {
      if (error.params === undefined) {
        addMessage("perms", error);
      } else {
        const name = error.params.path;
        const message = error.message;
        console.log({ error });
        addMessage(name, message);
      }
    }

    return false;
  };

  const validateForm = () => {
    const validUser = validateSchema(schemaUser, userValues);

    return validUser;
  };

  const cleanMessages = (schema) => {
    const names = schema._nodes;
    names.push("perms");

    const newMessages = names.reduce((acc, name) => {
      acc[name] = '';

      return acc;
    }, {});

    updateMultipleMessages(newMessages);
  };

  const handleSave = () => {
    if (!validateForm()) return;
    const fd = new FormData();

    fd.set('name', userValues.name);
    fd.set('email', userValues.email);
    fd.set('phone', userValues.phone);
    fd.set('role_id', userValues.role_id);

    data.perms.forEach((perm) => {
      fd.set(perm.name, perm.checked);
    });

    if (
      userValues.user_image &&
      userValues.user_image.name !== 'default.png' &&
      userValues.user_image.name !== apiValues.user_image.name
    ) {
      fd.set('user_image', userValues.user_image);
    }

    apiError.disable();

    if (userValues.id !== undefined) {
      // console.log(userValues.id)
      updateUser(fd, userValues.id)
        .then((result) => {
          onClose();
        })
        .catch((err) => {
          setApiErrorMessage(true);
          setApiErrorTitle(`Hubo un error con el ${err.error}`)
          handelApiError(err);
          console.log({ err })
        })
        .finally(() => {
          apiError.enable();
        });
    }
  };

  function onChangeCheckBox(e) {
    var newPerms = data.perms.map((perm) => ({
      name: perm.name,
      checked: perm.name === e.target.name ? !perm.checked : perm.checked
    }));

    updateData({
      ...data,
      perms: newPerms
    });
  }

  function handelApiError(error) {
    let msg = error.message.replaceAll(" ", "_");
    if (messagesintl[msg] !== undefined) {
      addMessage("api", intl.formatMessage(messagesintl[msg]));
    } else {
      addMessage("api", error.message);
    }
  }

  return (
    <Drawer
      anchor="right"
      open={visible}
      onClose={onClose}
      className={classes.root}
    >
      <CancelOkModal
        visible={apiErrorMessage}
        onCancel={()=>{setApiErrorMessage(false)}}
        onAccept={()=>{setApiErrorMessage(false)}}
        title={apiErrorTitle}
        text={messages.api}
      />
      
      <h1 className={classes.title}>Editar usuario</h1>
      <h2 className={classes.subtitle}>Completa la siguiente información para generar un nuevo registro de usuario.</h2>
      <h3 className={classes.rol}>Rol Asignado:{roleID}</h3>
      <UserImageInput
        name="user_image"
        label="Imagen"
        limitMB={5}
        message={
          messages.user_image ||
          messages.user_image_size ||
          messages.user_image_type
        }
        value={userValues.user_image !== undefined ? (userValues.user_image !== null ? userValues.user_image : '') : ('')}
        onChange={handleChange}
        edit={userValues.user_image !== undefined ? (userValues.user_image !== null ? true : false) : (false)}
        noPic = {userValues.user_image !== undefined ? (userValues.user_image !== null ? false : true) : (true)}
      />

      <h2 className={classes.data}>Datos</h2>
      <TextField
        label="Nombre completo"
        name="name"
        placeholder="Ej. Juan Manuel Ramirez Martinez"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        helperText={messages.name}
        className={classes.textField}
        onChange={handleChange}
        value={userValues.name}
      />

      <TextField
        label="Correo electronico"
        name="email"
        placeholder="Ej. correo@dominio.com"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        className={classes.textField}
        helperText={messages.email}
        onChange={handleChange}
        value={userValues.email}
      />

      <TextField
        label="Telefono de contacto"
        name="phone"
        placeholder="Ej. 5500000000"
        variant="filled"
        margin="dense"
        InputProps={{ disableUnderline: true }}
        className={classes.textField}
        helperText={messages.phone}
        onChange={handleChange}
        value={userValues.phone}
      />

      <h2 className={classes.permissions}>Permisos</h2>
      <h2 className={classes.legend}>Completa la siguiente información para generar un nuevo registro de usuario.</h2>
      <FormControl component="fieldset" className={classes.formGroup}>
        <FormGroup aria-label="position" row className={classes.formGroup}>
          <CheckboxGroups
            label={intl.formatMessage(messagesintl.perms)}
            subLabel={intl.formatMessage(messagesintl.permsPH)}
            values={data.perms}
            options={checkboxOptions}
            onCheck={onChangeCheckBox}
          />
        </FormGroup>
      </FormControl>

      <p className={classes.error}>
        {messages.perms}
      </p>

      <h2 className={classes.permissions}>Accesos</h2>
      <button css={buttonStyles} onClick={resetPass}> Generar nueva contraseña</button>
      <Grid
        container
        justify="flex-start"
        alignItems="center"
        style={{ marginTop: '2rem' }}
      >
        <Button className={classes.saveButton} onClick={handleSave}>Guardar</Button>
        <Button className={classes.cancelButton} onClick={onClose}>
          Cancelar
        </Button>
      </Grid>
    </Drawer>
  );
};
