import { defineMessages } from 'react-intl';
import { intlExt } from 'providers/intlExt';

export const formMessages = defineMessages({
  required: {
    id: 'required',
    defaultMessage: 'Este campo es requerido'
  },
  invalid: {
    id: 'invalid',
    defaultMessage: 'Este campo es inválido'
  },
  invalidImageType: {
    id: 'invalidImageType',
    defaultMessage:
      'Tipo de archivo inválido, tipos permitidos: jpg, png, gif, jpeg'
  },
  user_already_exists: {
    id: 'user_already_exists',
    title: 'Usuario inválido',
    defaultMessage: 'Este usuario ya existe.'
  },
  email_must_be_an_email: {
    id: 'email_must_be_an_email',
    title: 'Correo electrónico inválido',
    defaultMessage: 'El campo correo electrónico debe tener un correo electrónico valido.'
  },
  email_already_exists: {
    id: 'email_already_exists',
    title: 'Correo electrónico inválido',
    defaultMessage: 'El correo electrónico ya está registrado.'
  },
  access_denied: {
    id: 'access_denied',
    title: '',
    defaultMessage: 'Acceso denegado.'
  },
  only_image_are_allowed_jpg: {
    id: 'only_image_are_allowed_jpg',
    title: 'Formato de imagen inválido',
    defaultMessage: 'Solo formatos JPG, PNG y GIF son permitidos.'
  },
  internal_server_error: {
    id: 'internal_server_error',
    title: 'Ha ocurrido un error',
    defaultMessage: 'Ha ocurrido un error en el servidor.'
  },
});

export const formatedMessages = Object.keys(formMessages).reduce((acc, key) => {
  acc[key] = intlExt.formatMessage(formMessages[key]);

  return acc;
}, {});


