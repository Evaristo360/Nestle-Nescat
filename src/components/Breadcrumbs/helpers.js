import _ from 'lodash';

export const getPaths = (pathname) =>
  pathname === '/' ? [''] : _.split(pathname, '/');

export const getPathByPosition = (paths = [], position = 0) => {
  const includedPaths = _.slice(paths, 0, position + 1);

  if (_.size(includedPaths) === 1 && includedPaths[0] === '') return '/';

  return _.join(includedPaths, '/');
};
