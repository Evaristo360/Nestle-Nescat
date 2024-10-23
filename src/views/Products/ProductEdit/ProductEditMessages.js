import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  invalidEmail: {
    id: 'views.productedit.invalidemail',
    defaultMessage: 'Correo electrónico inválido'
  },
  required: {
    id: 'views.productedit.required',
    defaultMessage: 'Este campo es requerido'
  },
  onlyLetters: {
    id: 'views.productedit.onlyLetters',
    defaultMessage: 'Este campo solo puede contener letras'
  },
  bigSize: {
    id: 'views.productedit.bigsize',
    defaultMessage: 'El archivo es muy grande: Tamaño máximo de archivo 5MB'
  },
  invalidType: {
    id: 'views.productedit.invalidtype',
    defaultMessage: 'Tipo de archivo inválido. Tipos soportados: jpg, gif, png, jpeg'
  },
  onlyNumbers: {
    id: 'views.productedit.onlynumbers',
    defaultMessage: 'Este campo debe contener solo números'
  },
  telLength: {
    id: 'views.productedit.tellength',
    defaultMessage: 'Teléfono debe contener 10 dígitos'
  },
  pointsLength: {
    id: 'views.productedit.pointsLength',
    defaultMessage: 'Los puntos no pueden ser mayor a un número de 3 cifras.'
  },
  descriptionLength: {
    id: 'views.productedit.descriptionLength',
    defaultMessage: 'La descripción no pueden ser mayor a 60 caracteres.'
  },
  nameLength: {
    id: 'views.productedit.nameLength',
    defaultMessage: 'El nombre del producto no pueden ser mayor a 60 caracteres.'
  },
  code_sapLength: {
    id: 'views.productedit.code_sapLength',
    defaultMessage: 'MaterialSAP debe contener solo números y debe ser un número de hasta 50 dígitos.'
  },
  barcode_pieceLength: {
    id: 'views.productedit.barcode_pieceLength',
    defaultMessage: 'El Código de barras pieza debe contener solo números y debe ser un número de hasta 50 dígitos.'
  },
  barcode_boxLength: {
    id: 'views.productedit.barcode_boxLength',
    defaultMessage: 'El Código de barras caja debe contener solo números y debe ser un número de hasta 50 dígitos.'
  },
  number_10_length: {
    id: 'views.productedit.number_10_length',
    defaultMessage: 'EL número debe ser de 10 dígitos.'
  },
});
