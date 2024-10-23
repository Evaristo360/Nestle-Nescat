import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  deleteConfirm: {
    id: 'views.modals.deleteconfirm',
    defaultMessage: '¿Seguro que quiere eliminar a este usuario?'
  },
  accept: {
    id: 'views.modals.accept',
    defaultMessage: 'Aceptar'
  },
  cancel: {
    id: 'views.modals.cancel',
    defaultMessage: 'Cancelar'
  },
  confirmUpdatePass: {
    id: 'views.modals.confirmupdatepass',
    defaultMessage: '¿Estás seguro que quieres actualizar la contraseña?'
  },
  confirmUpdatePassBody: {
    id: 'views.modals.confirmUpdatePassBody',
    defaultMessage: 'Se enviará la nueva contraseña al correo del cliente.'
  }
});
