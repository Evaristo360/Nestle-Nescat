import _ from 'lodash';

export const defaultGetOptionLabel = (option) => {
  if (!option) return '';

  if (_.isObject(option)) {
    const keys = _.keys(option);

    return _.get(option, keys[0]);
  }

  return option;
};
