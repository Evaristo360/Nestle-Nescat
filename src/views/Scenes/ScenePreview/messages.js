const messages = {
  autoplay: 'Autoplay está desactivado',
  autoplayLong:
    'Por favor permite reproducir video y audio en tu navegador y refresca la página',
  errorVideo: 'El video no se puede reproducir',
  errorVideoLong: 'Por favor verifique su conexión a internet',
  errorImage: 'Error al cargar imagen'
};

export const getMsg = (id) => messages[id] || '';
