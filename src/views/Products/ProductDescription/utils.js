const errDict = {
  '/users::400::required::.name': 'Es obligatorio ingresar un nombre',
  '/users::400::required::.email': 'Es obligatorio ingresar una email',
  '/users::400::format::.email': ' Formato de email incorrecto',
  '/users::400::pattern::.phone::^\\+?[0-9]{9,12}$':
    'Formato de teléfono incorrecto, debe tener de 9 a 12 números y opcionalmente un signo "+" al principio',
  '/users::400::alreadyExists::.email': 'Correo ya existente'
};

const errToken = (edge, err) => {
  var res = err.response;
  var data = res.data;
  var token = `${edge}::${res.status}::${data.error}`;

  if (data.dataPath) token = `${token}::${data.dataPath}`;
  if (data.params) {
    if (data.params.deps) token = `${token}::${data.params.deps}`;
    if (data.params.pattern) token = `${token}::${data.params.pattern}`;
  }

  return token;
};

export const errorTranslate = (edge, err) => {
  var token = errToken(edge, err);

  if (errDict[token]) {
    return errDict[token];
  } else {
    return token;
  }
};
