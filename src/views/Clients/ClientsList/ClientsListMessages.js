import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  pageTitle: {
    id: 'views.clientsList.pageTitle',
    defaultMessage: 'Clientes'
  },
  pageDescription: {
    id: 'views.clientsList.pageDescription',
    defaultMessage: 'Agrega nuevos clientes y gestiona sus datos.'
  },
  buttonNewClient: {
    id: 'views.clientsList.buttonNewClient',
    defaultMessage: 'Nuevo cliente'
  }, 
  tableColumnId: {
    id: 'views.clientsList.tableColumnId',
    defaultMessage: 'ID'
  }, 
  tableColumnName: {
    id: 'views.clientsList.tableColumnName',
    defaultMessage: 'Nombre'
  },
  tableColumnDateCreated: {
    id: 'views.clientsList.tableColumnDateCreated',
    defaultMessage: 'Fecha y hora de alta'
  },
  tableColumnConnection: {
    id: 'views.clientsList.tablecolumnConexion',
    defaultMessage: 'Conexión'
  },
  tableColumnBranches: {
    id: 'views.clientsList.tableColumnBranches',
    defaultMessage: 'Sucursales'
  },
  tableColumnDigitalDisplay: {
    id: 'views.clientsList.tableColumnDigitalDisplay',
    defaultMessage: 'Digital Display'
  },
  tableColumnTotem: {
    id: 'views.clientsList.tableColumnTotem',
    defaultMessage: 'Tótems'
  },
  tableColumnAction: {
    id: 'views.clientsList.tableColumnAction',
    defaultMessage: 'Acción'
  },
  deleteModalTitle: {
    id: 'views.clientsList.deleteModalTitle',
    defaultMessage: 'Borrar cliente'
  },
  deleteModalText: {
    id: 'views.clientsList.deleteModalText',
    defaultMessage: '¿Estás seguro de querer eliminar este cliente?'
  },
  deleteModalOkLabel: {
    id: 'views.clientsList.deleteModalOkLabel',
    defaultMessage: 'Aceptar'
  },
  deleteModalCancelLabel: {
    id: 'views.clientsList.deleteModalCancelLabel',
    defaultMessage: 'Cancelar'
  },
});
