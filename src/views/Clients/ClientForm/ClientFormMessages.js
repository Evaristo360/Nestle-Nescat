import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  //<<<<<<<<<<<<<<<CREATE MESSAGES>>>>>>>>>>>>>
  titleCreate: {
    id: 'views.clientsForm.titleCreate',
    defaultMessage: 'Nuevo cliente'
  },

  //<<<<<<<<<<<<<<<EDIT MESSAGES>>>>>>>>>>>>>
  titleEdit: {
    id: 'views.clientsForm.titleEdit',
    defaultMessage: 'Editar cliente'
  },

  //<<<<<<<<<<<<<<<MESSAGES>>>>>>>>>>>>>
  subtitleText: {
    id: 'views.clientsForm.subtitleText',
    defaultMessage: 'Completa la siguiente información para generar un nuevo registro de cliente.'
  },
  activated_on: {
    id: 'views.clientsForm.activated_on',
    defaultMessage: 'Fecha de activación: '
  },
  stateClientText: {
    id: 'views.clientsForm.stateClientText',
    defaultMessage: 'Estatus: '
  },
  logoTitle: {
    id: 'views.clientsForm.logoTitle',
    defaultMessage: 'Logotipo'
  },
  logoText: {
    id: 'views.clientsForm.logoText',
    defaultMessage: 'Selecciona una imagen con máximo 5 MB de peso.'
  },
  uploadImage: {
    id: 'views.clientsForm.uploadImage',
    defaultMessage: 'Subir imagen'
  },
  noFile: {
    id: 'views.clientsForm.noFile',
    defaultMessage: 'Ningún archivo seleccionado'
  },
  dataTitle: {
    id: 'views.clientsForm.dataTitle',
    defaultMessage: 'Datos'
  },
  dataName_contact: {
    id: 'views.clientsForm.dataName_contact',
    defaultMessage: 'Nombre del contacto'
  },
  dataId: {
    id: 'views.clientsForm.dataId',
    defaultMessage: 'ID'
  },
  dataName: {
    id: 'views.clientsForm.dataName',
    defaultMessage: 'Nombre'
  },
  dataEmail: {
    id: 'views.clientsForm.dataEmail',
    defaultMessage: 'Correo electrónico'
  },
  dataPhone: {
    id: 'views.clientsForm.dataPhone',
    defaultMessage: 'Teléfono de contacto'
  },
  permissionsTitle: {
    id: 'views.clientsForm.permissionsTitle',
    defaultMessage: 'Permisos'
  },
  permissionsSubtitle: {
    id: 'views.clientsForm.permissionsSubtitle',
    defaultMessage: 'Módulos permitidos que puede visualizar el usuario'
  },
  permissionsNote: {
    id: 'views.clientsForm.permissionsNote',
    defaultMessage: '**Los accesos serán generados de forma automática al crear el cliente.'
  },

  //<<<<<<<<<<<<<<<<<LABELS PERMISSIONS>>>>>>>>>>>>>>>>>>>>>
  analyticsLabel: {
    id: 'views.clientsForm.analyticsLabel',
    defaultMessage: 'Analytics'
  },
  digital_displayLabel: {
    id: 'views.clientsForm.digital_displayLabel',
    defaultMessage: 'Digital display'
  },
  totemLabel: {
    id: 'views.clientsForm.totemLabel',
    defaultMessage: 'Tótem'
  },
  branchesLabel: {
    id: 'views.clientsForm.branchesLabel',
    defaultMessage: 'Sucursales'
  },
  redemption_ptsLabel: {
    id: 'views.clientsForm.redemption_ptsLabel',
    defaultMessage: 'Canjeo puntos'
  },
  purchase_requestLabel: {
    id: 'views.clientsForm.purchase_requestLabel',
    defaultMessage: 'Solicitudes de compra'
  },
  advertisementLabel: {
    id: 'views.clientsForm.advertisementLabel',
    defaultMessage: 'Publicidad'
  },
  managementLabel: {
    id: 'views.clientsForm.userManagementLabel',
    defaultMessage: 'Gestión de usuarios (sus usuarios)'
  },
  productLabel: {
    id: 'views.clientsForm.productLabel',
    defaultMessage: 'Productos'
  },
  client_moduleLabel: {
    id: 'views.clientsForm.client_moduleLabel',
    defaultMessage: 'Clientes'
  },
  load_ptsLabel: {
    id: 'views.clientsForm.load_ptsLabel',
    defaultMessage: 'Carga de puntos'
  },
  customersLabel: {
    id: 'views.clientsForm.customersLabel',
    defaultMessage: 'Consumidores'
  },
  sale_offLabel: {
    id: 'views.clientsForm.sale_offLabel',
    defaultMessage: 'Promociones'
  },

  //<<<<<<<<<<<<<<<<<<<VALIDATIONS>>>>>>>>>>>>>>>>>>>>
  required: {
    id: 'views.clientsForm.required',
    defaultMessage: 'Este campo es requerido'
  },
  onlyLetters: {
    id: 'views.clientsForm.onlyLetters',
    defaultMessage: 'Este campo solo puede contener letras'
  },
  invalidEmail: {
    id: 'views.clientsForm.invalidEmail',
    defaultMessage: 'Correo electrónico inválido'
  },
  invalidTelephone: {
    id: 'views.clientsForm.invalidTelephone',
    defaultMessage: 'El número de teléfono es inválido'
  },
  maxSizeImage: {
    id: 'views.clientsForm.maxSizeImage',
    defaultMessage: 'Máx. 5MB'
  },
  invalidTypeImage: {
    id: 'views.clientsForm.invalidTypeImage',
    defaultMessage: 'Tipo de archivo inválido. Tipos soportados: jpg, gif, png, jpeg'
  },
  telephoneLength: {
    id: 'views.clientsForm.telephoneLength',
    defaultMessage: 'Teléfono debe contener 10 digitos'
  }
});
