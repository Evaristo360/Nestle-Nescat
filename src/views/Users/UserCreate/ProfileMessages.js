import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  invalidEmail: {
    id: 'views.usercreate.invalidemail',
    defaultMessage: 'Correo electrónico inválido'
  },
  required: {
    id: 'views.usercreate.required',
    defaultMessage: 'Este campo es requerido'
  },
  onlyLetters: {
    id: 'views.usercreate.onlyLetters',
    defaultMessage: 'Este campo solo puede contener letras'
  },
  bigSize: {
    id: 'views.usercreate.bigsize',
    defaultMessage: 'El archivo es muy grande: Tamaño máximo de archivo 5MB'
  },
  invalidType: {
    id: 'views.usercreate.invalidtype',
    defaultMessage: 'Tipo de archivo inválido. Tipos soportados: jpg, gif, png, jpeg'
  },
  onlyNumbersTel: {
    id: 'views.usercreate.onlynumberstel',
    defaultMessage: 'Teléfono debe contener solo números'
  },
  telLength: {
    id: 'views.usercreate.tellength',
    defaultMessage: 'Teléfono debe contener 10 digitos'
  },
  NestleUser: {
    id: 'views.usercreate.NestleUser',
    defaultMessage: ' Operador Nestlé'
  },
  clientUser: {
    id: 'views.usercreate.clientUser',
    defaultMessage: ' Operador Cliente'
  }
});
