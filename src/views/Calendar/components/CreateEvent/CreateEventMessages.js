import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  invalidEmail: {
    id: 'views.profile.invalidemail',
    defaultMessage: 'Correo electrónico inválido'
  },
  required: {
    id: 'views.profile.required',
    defaultMessage: 'Este campo es requerido'
  },
  onlyLetters: {
    id: 'views.profile.onlyLetters',
    defaultMessage: 'Este campo solo puede contener letras'
  },
  bigSize: {
    id: 'views.profile.bigsize',
    defaultMessage: 'El archivo es muy grande: Tamaño máximo de archivo 5MB'
  },
  invalidType: {
    id: 'views.profile.invalidtype',
    defaultMessage: 'Tipo de archivo inválido. Tipos soportados: jpg, gif, png, jpeg'
  },
  onlyNumbersTel: {
    id: 'views.profile.onlynumberstel',
    defaultMessage: 'Teléfono debe contener solo números'
  },
  telLength: {
    id: 'views.profile.tellength',
    defaultMessage: 'Teléfono debe contener 10 digitos'
  }
});
