const messages = {
  endPreviewTitle: 'Vista previa finalizada',
  endPreviewText: 'Las respuestas no fueron guardadas.'
};

export const getMsg = (id) => messages[id] || '';
