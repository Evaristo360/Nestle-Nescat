import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import default_image from 'assets/img/octopy-isotipo.png';
import { resetPassword, updateMyInfo } from 'providers/api/requests';
import {getProfilePhoto} from './api';
import * as yup from 'yup';
import { intlExt } from 'providers/intlExt';
import { messages as formMessages } from './ProfileMessages';
import { useHistory } from 'react-router-dom';
import { useMyInfo } from 'hooks/useMyInfo';
import { config } from 'providers/config';
import { useGlobalApiError } from 'hooks/useGlobalApiError';
import usePromiseModal from 'hooks/usePromiseModal';
import useLocalStorage from 'hooks/useLocalStorage';

const passwordRegex = /^(?=.*\d)(?=.*[\u0021-\u002f\u003a-\u0040\u005b-\u0060\u00a1\u00bf])(?=.*[A-Z])(?=.*[a-z])\S{6,15}$/;
const requiredMsg = intlExt.formatMessage(formMessages.required);

const schemaProfile = yup.object().shape({
  name: yup.string().max(60).required(requiredMsg),
  email: yup
    .string()
    .email(intlExt.formatMessage(formMessages.invalidEmail))
    .required(requiredMsg),
  user_image_size: yup
    .number()
    .max(5000000, intlExt.formatMessage(formMessages.bigSize)),
  user_image_type: yup
    .string()
    .oneOf(
      ['image/jpg', 'image/png', 'image/gif', 'image/jpeg'],
      intlExt.formatMessage(formMessages.invalidType)
    ),
  currentPassword: yup.string(),
  newPassword: yup
    .string()
    .matches(passwordRegex, {
      message:
        'La contraseña debe contener de 6 a 15 caracteres, una minúscula, una mayúscula y un carácter especial.',
      excludeEmptyString: true
    })
    .oneOf([yup.ref('confirmPassword'), null], 'Las contraseñas no coinciden'),
  confirmPassword: yup
    .string()
    .matches(passwordRegex, {
      message:
        'La contraseña debe contener de 6 a 15 caracteres, una minúscula, una mayúscula y un carácter especial.',
      excludeEmptyString: true
    })
    .oneOf([yup.ref('newPassword'), null], 'Las contraseñas no coinciden')
});

const initialProfile = {
  id: 'Loading',
  name: '',
  email: '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  user_image: null,
  user_image_size: 0,
  user_image_type: ''
};

export const useProfiles = ({ visible, onClose }) => {
  const { userData } = useMyInfo();
  const { removeItem } = useLocalStorage();
  const promiseModal = usePromiseModal();
  const globalError = useGlobalApiError();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  useEffect(async () => {
    globalError.disable();
    let initValues = userData;

    if (initValues.image_url !== undefined) {
      let defaultProfile = await getProfilePhoto(
        config.siteConfig.apiUrl + '/' + initValues.image_url,
        default_image,
        userData.id
      );
      initValues.user_image = defaultProfile;
      initValues.user_image_type = defaultProfile.type;
      initValues.user_image_size = defaultProfile.size;
      formik.setFieldTouched('user_image', true);
      formik.setFieldTouched('user_image_type', true);
      formik.setFieldTouched('user_image_size', true);
    }
    formik.setFieldTouched('name', true);
    formik.setFieldTouched('email', true);
    formik.setValues({ ...initialProfile, ...initValues });
    globalError.enable();
  }, [visible]);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangePhoto = (event) => {
    const { name, value, type } = event.target;

    if (type === 'file') {
      const file = event.target.files[0];
      formik.setFieldValue('user_image', file);
      formik.setFieldValue('user_image_size', file.size);
      formik.setFieldValue('user_image_type', file.type);
    }
  };

  const formik = useFormik({
    initialValues: initialProfile,
    validationSchema: schemaProfile,
    onSubmit: async (values) => {
      const fd = new FormData();
      const passwordChanged =
        values.currentPassword && values.newPassword && values.confirmPassword;

      fd.set('name', values.name);
      fd.set('email', values.email);

      if (values.user_image && values.user_image.name !== 'default.png') {
        fd.set('user_image', values.user_image);
      }

      try {
        const response = await updateMyInfo(fd);
        if (!passwordChanged) {
          onClose();
          return window.location.reload();
        }
      } catch (error) {
        console.log({ error });
      }

      try {
        globalError.disableForCodes([401]);
        if (passwordChanged) {
          const response = await resetPassword(
            values.currentPassword,
            values.confirmPassword
          );
          if (response.error) {
            if (response.message === 'Password does not match') {
              await promiseModal.openModal(
                'Credenciales incorrectas',
                'La contraseña actual es incorrecta'
              );
            } else {
              await promiseModal.openModal(
                'Error',
                'Ha ocurrido un error, intente de nuevo más tarde'
              );
            }
          } else {
            formik.setFieldValue('currentPassword', '');
            formik.setFieldValue('newPassword', '');
            formik.setFieldValue('confirmPassword', '');
            setShowCurrentPassword(false);
            setShowNewPassword(false);
            setShowConfirmPassword(false);
            removeItem('user_id');
            removeItem('role_id');
            removeItem('client_id');
            removeItem('token');
            removeItem('permissions');
            onClose();
            history.replace('/');
          }
        }
      } catch (error) {
        console.log({ error });
      } finally {
        globalError.enableForAllCodes();
      }

      setIsLoading(false);
    }
  });

  return {
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
  };
};

