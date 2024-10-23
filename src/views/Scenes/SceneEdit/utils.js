const errDict = {
  '/scene::400::required::.scene_image':
    'Es necesario eligir una imagen para la escena'
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
