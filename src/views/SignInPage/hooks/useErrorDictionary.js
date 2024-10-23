function useErrorDictionary({ error }) {
  console.log("llega error",error)
  const dictrionary = {
    InvalidCredentials:
      'Usuario y/o contraseña incorrectos favor de verificar la información.',
    invalidCredentials:
      'Usuario y/o contraseña incorrectos favor de verificar la información.',
    inactiveLicense:
      'Su cuenta está deshabilitada, si cree que es un error contáctenos.',
    notFoundUsername: 'Usuario no encontrado.',
    notEnoughStock: 'Ya no se encutran productos en el inventario.',
    robotDisconnected: 'Intente de nuevo.',
    type: 'Datos incorrectos, verifique la información enviada.',
    somethingWrongInServer:
      'Ha ocurrido un error de conexión, intente de nuevo.',
    invalidPermissions:
      'No se cuentan con los permisos para realizar esta acción.',
    invalidToken: 'La sesión ha expirado.',
    itemDoesNotExist: 'El producto seleccionado no se encuentra registrado.',
    overStockLimit: 'El invetario ya se encuentra a tope.',
    dependencies:
      'Verifique que todos los campos se hayan llenado correctamente.',
    noComments: 'Por favor ingrese un comentario.',
    paymentError:
      'Hubo un error y su compra fue cancelada, comuniquese con un operador.',
    notSuperAdmin:
      'Esta cuenta no tiene los permisos para acceder a esta sección.',
    inPause: "Seleccione la opción 'play' para continuar",
    'fondos insuficientes':
      'El monto ingresado es insuficiente para realizar la compra.',
    'Error al guardar la bandeja':
      'Ha ocurrido un error interno, comuniquese con un operador.',
    saveSafetyTray: 'Error al guardar la bandeja, comuniquese con un operador.',
    itemMotor:
      'Ha ocurrido un error al girar motor, comuniquese con un operador.',
    outSafetyTray:
      'Ha ocurrido un error al cerrar la badeja, comuniquese con un operador.',
    ozonoActivation: 'Error con el ozono, comuniquese con un operador.',
    timeoutItemMotor:
      'Tiempo de espera del giro del motor excedido, comuniquese con un operador.',
    timeoutDoorMotor:
      'Tiempo de espera del motor de bandeja excedido, comuniquese con un operador.',
    withoutFunds: 'Fondos insuficientes para realizar la compra.',
    noChange: 'Cambio insuficiente.',
    initMappingError: 'Ha ocurrido un error al iniciar el modo mapeo.',
    noValues: 'Ingrese un valor.',
    passwordsNotMatch: 'Contraseñas no coinciden.',
    identificationMin: 'La cédula profesional debe tener de 7 a 10 dígitos.',
    notFound: 'No se encontró ningún correo electrónico',
    alreadyAnswered: 'Esta encuenta ya ha sido respondida, intente con otra.',
    surveyNotFound: 'No se ha encontrado la encuesta.',
    noEmails: 'Por favor, escriba un correo electrónico.',
    wrongEmailFormat: 'El correo electrónico tiene formato incorrecto.',
    noEmailMessage: 'Por favor, escriba el mesaje del correo electrónico.'
  };

  if (!error) {
    return 'Ha ocurrido un error, favor de intentarlo de nuevo.';
  }

  if (!dictrionary[error]) {
    return 'El usuario y/o contraseña son incorrectos.';
  }

  return dictrionary[error];
}

export default useErrorDictionary;
