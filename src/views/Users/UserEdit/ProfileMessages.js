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
    id: 'views.useredit.onlyLetters',
    defaultMessage: 'Este campo solo puede contener letras'
  },
  bigSize: {
    id: 'views.useredit.bigsize',
    defaultMessage: 'El archivo es muy grande: Tamaño máximo de archivo 5MB'
  },
  invalidType: {
    id: 'views.useredit.invalidtype',
    defaultMessage: 'Tipo de archivo inválido. Tipos soportados: jpg, gif, png, jpeg'
  },
  onlyNumbersTel: {
    id: 'views.useredit.onlynumberstel',
    defaultMessage: 'Teléfono debe contener solo números'
  },
  telLength: {
    id: 'views.useredit.tellength',
    defaultMessage: 'Teléfono debe contener 10 digitos'
  },
  NestleUser: {
    id: 'views.useredit.NestleUser',
    defaultMessage: ' Operador Nestlé'
  },
  clientUser: {
    id: 'views.useredit.clientUser',
    defaultMessage: ' Operador Cliente'
  },
  adminNestle: {
    id: 'views.useredit.NestleUser',
    defaultMessage: ' Admin Nestlé'
  },
  adminClient: {
    id: 'views.useredit.clientUser',
    defaultMessage: ' Admin Cliente'
  }
});
