import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  editTimeline: {
    id: 'views.sceneDesign.editTimeline',
    defaultMessage: 'Editar timeline'
  },
  addMedia: {
    id: 'views.sceneDesign.addMedia',
    defaultMessage: 'Agregar medios: '
  },
  save: {
    id: 'views.sceneDesign.save',
    defaultMessage: 'Guardar'
  },
  addText: {
    id: 'views.sceneDesign.addText',
    defaultMessage: 'Agregar texto'
  },
  addVideo: {
    id: 'views.sceneDesign.addVideo',
    defaultMessage: 'Agregar video'
  },
  addImage: {
    id: 'views.sceneDesign.addImage',
    defaultMessage: 'Agregar imagen'
  },
  addWeb: {
    id: 'views.sceneDesign.addWeb',
    defaultMessage: 'Agregar página web'
  },
  preview: {
    id: 'views.sceneDesign.preview',
    defaultMessage: 'Vista previa'
  },
  editScene: {
    id: 'views.sceneDesign.editScene',
    defaultMessage: 'Editar escena'
  },
  undo: {
    id: 'views.sceneDesign.undo',
    defaultMessage: 'Deshacer'
  }
});

export const addVideoMessages = defineMessages({
  title: {
    id: 'views.sceneDesign.addVideo.title',
    defaultMessage: 'Agregar video'
  },
  subtitle: {
    id: 'views.sceneDesign.addVideo.subtitle',
    defaultMessage: 'Mis videos'
  },
  addFile: {
    id: 'views.sceneDesign.addVideo.addFile',
    defaultMessage: 'Agregar archivo'
  },
  asignedFiles: {
    id: 'views.sceneDesign.addVideo.asignedFiles',
    defaultMessage: 'Archivos asignados'
  },
  invalidType: {
    id: 'views.sceneDesign.addVideo.invalidType',
    defaultMessage: 'El video no es soportado'
  },
  invalidTypeLong: {
    id: 'views.sceneDesign.addVideo.invalidTypeLong',
    defaultMessage: 'Solo se permite video con extensión .mp4 o .avi'
  },
  invalidSize: {
    id: 'views.sceneDesign.addVideo.invalidSize',
    defaultMessage: 'El video es muy grande'
  },
  invalidSizeLong: {
    id: 'views.sceneDesign.addVideo.invalidSizeLong',
    defaultMessage:
      'El archivo seleccionado excede los 100MB, debe ser de menor peso'
  },
  maxLength: {
    id: 'views.sceneDesign.addVideo.maxLength',
    defaultMessage: 'Máximo 50 caracteres'
  },
  placeholderFile: {
    id: 'views.sceneDesign.addVideo.placeholderFile',
    defaultMessage: 'Nombre del archivo'
  },
  labelFile: {
    id: 'views.sceneDesign.addVideo.labelFile',
    defaultMessage: 'Nombre: '
  },
  requiredFilename: {
    id: 'views.sceneDesign.addVideo.requiredFilename',
    defaultMessage: 'Por favor escribe un nombre de archivo'
  },
  filenameExists: {
    id: 'views.sceneDesign.addVideo.filenameExists',
    defaultMessage: 'El nombre de archivo ya existe en la lista'
  },
  filenameExistsLong: {
    id: 'views.sceneDesign.addVideo.filenameExistsLong',
    defaultMessage: 'Por favor escribe un nombre distinto e intenta de nuevo'
  },
  fileUploaded: {
    id: 'views.sceneDesign.addVideo.fileUploaded',
    defaultMessage: 'El video se ha subido'
  },
  fileUploadedLong: {
    id: 'views.sceneDesign.addVideo.fileUploadedLong',
    defaultMessage:
      'Se agregó a la lista de archivos asignados y archivos subidos'
  },
  errorUpload: {
    id: 'views.sceneDesign.addVideo.errorUpload',
    defaultMessage: 'Ha ocurrido un error al subir el archivo'
  },
  errorUploadLong: {
    id: 'views.sceneDesign.addVideo.errorUploadLong',
    defaultMessage:
      'Por favor compruebe su conexión a internet e intente nuevamente'
  },
  confirmDelete: {
    id: 'views.sceneDesign.addVideo.confirmDelete',
    defaultMessage: '¿Está seguro de querer eliminar este contenido?'
  },
  accept: {
    id: 'views.sceneDesign.addVideo.accept',
    defaultMessage: 'Aceptar'
  },
  cancel: {
    id: 'views.sceneDesign.addVideo.cancel',
    defaultMessage: 'Cancelar'
  }
});

export const addImageMessages = defineMessages({
  title: {
    id: 'views.sceneDesign.addImage.title',
    defaultMessage: 'Agregar imagen'
  },
  subtitle: {
    id: 'views.sceneDesign.addImage.subtitle',
    defaultMessage: 'Mis imágenes'
  },
  addFile: {
    id: 'views.sceneDesign.addImage.addFile',
    defaultMessage: 'Agregar archivo'
  },
  asignedFiles: {
    id: 'views.sceneDesign.addImage.asignedFiles',
    defaultMessage: 'Archivos asignados'
  },
  invalidType: {
    id: 'views.sceneDesign.addImage.invalidType',
    defaultMessage: 'La imagen no es soportada'
  },
  invalidTypeLong: {
    id: 'views.sceneDesign.addImage.invalidTypeLong',
    defaultMessage:
      'Solo se permite imágenes con extensión jpg, .jpeg, .png o .gif'
  },
  invalidSize: {
    id: 'views.sceneDesign.addImage.invalidSize',
    defaultMessage: 'La imagen es muy grande'
  },
  invalidSizeLong: {
    id: 'views.sceneDesign.addImage.invalidSizeLong',
    defaultMessage:
      'El archivo seleccionado excede los 30MB, debe ser de menor peso'
  },
  maxLength: {
    id: 'views.sceneDesign.addImage.maxLength',
    defaultMessage: 'Máximo 50 caracteres'
  },
  placeholderFile: {
    id: 'views.sceneDesign.addImage.placeholderFile',
    defaultMessage: 'Nombre del archivo'
  },
  labelFile: {
    id: 'views.sceneDesign.addImage.labelFile',
    defaultMessage: 'Nombre: '
  },
  requiredFilename: {
    id: 'views.sceneDesign.addImage.requiredFilename',
    defaultMessage: 'Por favor escribe un nombre de archivo'
  },
  filenameExists: {
    id: 'views.sceneDesign.addImage.filenameExists',
    defaultMessage: 'El nombre de archivo ya existe en la lista'
  },
  filenameExistsLong: {
    id: 'views.sceneDesign.addImage.filenameExistsLong',
    defaultMessage: 'Por favor escribe un nombre distinto e intenta de nuevo'
  },
  fileUploaded: {
    id: 'views.sceneDesign.addImage.fileUploaded',
    defaultMessage: 'La imagen se ha subido'
  },
  fileUploadedLong: {
    id: 'views.sceneDesign.addImage.fileUploadedLong',
    defaultMessage:
      'Se agregó a la lista de archivos asignados y archivos subidos'
  },
  confirmDelete: {
    id: 'views.sceneDesign.addImage.confirmDelete',
    defaultMessage: '¿Está seguro de querer eliminar este contenido?'
  },
  accept: {
    id: 'views.sceneDesign.addImage.accept',
    defaultMessage: 'Aceptar'
  },
  cancel: {
    id: 'views.sceneDesign.addImage.cancel',
    defaultMessage: 'Cancelar'
  }
});

export const editImageMessages = defineMessages({
  title: {
    id: 'views.sceneDesign.editImage.title',
    defaultMessage: 'Editar imagen'
  },
  subtitle: {
    id: 'views.sceneDesign.editImage.subtitle',
    defaultMessage: 'Datos de la imagen'
  },
  durationDescription: {
    id: 'views.sceneDesign.editImage.durationDescription',
    defaultMessage: 'Seleccione para proporcionar una duración específica'
  },
  save: {
    id: 'views.sceneDesign.editImage.save',
    defaultMessage: 'Guardar'
  },
  cancel: {
    id: 'views.sceneDesign.editImage.cancel',
    defaultMessage: 'Cancelar'
  }
});

export const editVideoMessages = defineMessages({
  title: {
    id: 'views.sceneDesign.editVideo.title',
    defaultMessage: 'Editar video'
  },
  subtitle: {
    id: 'views.sceneDesign.editVideo.subtitle',
    defaultMessage: 'Datos del video'
  },
  durationDescription: {
    id: 'views.sceneDesign.editVideo.durationDescription',
    defaultMessage: 'Seleccione para proporcionar una duración específica'
  },
  save: {
    id: 'views.sceneDesign.editVideo.save',
    defaultMessage: 'Guardar'
  },
  cancel: {
    id: 'views.sceneDesign.editVideo.cancel',
    defaultMessage: 'Cancelar'
  }
});
