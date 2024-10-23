import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  invalidEmail: {
    id: 'views.equivalentproduct.invalidemail',
    defaultMessage: 'Correo electrónico inválido'
  },
  required: {
    id: 'views.equivalentproduct.required',
    defaultMessage: 'Este campo es requerido'
  },
  onlyLetters: {
    id: 'views.equivalentproduct.onlyLetters',
    defaultMessage: 'Este campo solo puede contener letras'
  },
  bigSize: {
    id: 'views.equivalentproduct.bigsize',
    defaultMessage: 'El archivo es muy grande: Tamaño máximo de archivo 5MB'
  },
  invalidType: {
    id: 'views.equivalentproduct.invalidtype',
    defaultMessage: 'Tipo de archivo inválido. Tipos soportados: jpg, gif, png, jpeg'
  },
  onlyNumbers: {
    id: 'views.equivalentproduct.onlynumbers',
    defaultMessage: 'Este campo debe contener solo números'
  },
  telLength: {
    id: 'views.equivalentproduct.tellength',
    defaultMessage: 'Teléfono debe contener 10 dígitos'
  },
  pointsLength: {
    id: 'views.equivalentproduct.pointsLength',
    defaultMessage: 'Los puntos no pueden ser mayor a un número de 3 cifras.'
  },
  descriptionLength: {
    id: 'views.equivalentproduct.descriptionLength',
    defaultMessage: 'La descripción no pueden ser mayor a 60 caracteres.'
  },
  nameLength: {
    id: 'views.equivalentproduct.nameLength',
    defaultMessage: 'El nombre del producto no pueden ser mayor a 60 caracteres.'
  },
  code_sapLength: {
    id: 'views.equivalentproduct.code_sapLength',
    defaultMessage: 'MaterialSAP debe contener solo números y debe ser un número de hasta 50 dígitos.'
  },
  barcode_pieceLength: {
    id: 'views.equivalentproduct.barcode_pieceLength',
    defaultMessage: 'El Código de barras pieza debe contener solo números y debe ser un número de hasta 50 dígitos.'
  },
  barcode_boxLength: {
    id: 'views.equivalentproduct.barcode_boxLength',
    defaultMessage: 'El Código de barras caja debe contener solo números y debe ser un número de hasta 50 dígitos.'
  },
  number_10_length: {
    id: 'views.equivalentproduct.number_10_length',
    defaultMessage: 'EL número debe ser de 10 dígitos.'
  },
});
