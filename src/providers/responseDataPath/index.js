import _ from 'lodash';

export const oldDataPath = 'data.result';
export const defaultDataPath = 'data';

export const getResponseDataPath = (response) => {
  const isOldPath = Boolean(_.get(response, oldDataPath));

  return isOldPath ? oldDataPath : defaultDataPath;
};
