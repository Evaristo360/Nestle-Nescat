import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  //<<<<<<<<<<<<<<<CREATE MESSAGES>>>>>>>>>>>>>
  titleCreate: {
    id: 'views.branchExchangeForm.titleCreate',
    defaultMessage: 'Nuevo producto para canjeo'
  },

  //<<<<<<<<<<<<<<<EDIT MESSAGES>>>>>>>>>>>>>
  titleEdit: {
    id: 'views.branchExchangeForm.titleEdit',
    defaultMessage: 'Editar producto para canjeo'
  },


  //<<<<<<<<<<<<<<<MESSAGES>>>>>>>>>>>>>
  textLegend:{
    id: 'views.branchExchangeForm.textLegend',
    defaultMessage: 'Selecciona el producto que deseas habilitar para canjeo de puntos.'
  },
  dataProduct: {
    id: 'views.branchExchangeForm.dataProduct',
    defaultMessage: 'Producto'
  },
  dataAvailabilityTitle: {
    id: 'views.branchExchangeForm.dataAvailabilityTitle',
    defaultMessage: 'Disponibilidad'
  },
  dataUnlimited: {
    id: 'views.branchExchangeForm.dataUnlimited',
    defaultMessage: 'Ilimitado'
  },
  dataLimited: {
    id: 'views.branchExchangeForm.dataLimited',
    defaultMessage: 'Limitado'
  },
  dataNumberExchanges: {
    id: 'views.branchExchangeForm.dataNumberExchanges',
    defaultMessage: 'Cantidad de canjes'
  },
  //<<<<<<<<<<<<<<<<<<<VALIDATIONS>>>>>>>>>>>>>>>>>>>>
  required: {
    id: 'views.branchExchangeForm.required',
    defaultMessage: 'Este campo es requerido'
  },
  invalidQuantity:{
    id: 'views.branchExchangeForm.invalidQuantity',
    defaultMessage: 'La cantidad es invalida' 
  }
});
