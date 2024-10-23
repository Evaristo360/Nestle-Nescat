/* eslint-disable react-hooks/rules-of-hooks,react-hooks/exhaustive-deps */
import _ from 'lodash';
import PropTypes from 'prop-types';
import { useContext, useEffect } from 'react';
import { usePrevious } from 'hooks/usePrevious';
import { getObjectDiff, logDiffs } from './helpers';

const ContextLogger = (props) => {
  const { contexts, config } = props;
  const contextList = _.keys(contexts);

  if (_.size(contextList) === 0) return null;

  const allContexts = _.map(contextList, (contextName) => ({
    name: contextName,
    value: useContext(contexts[contextName])
  }));

  const allPreviousContexts = _.map(allContexts, (contextData) =>
    usePrevious(contextData)
  );

  useEffect(() => {
    _.forEach(allContexts, (context) => {
      const previousContext = _.find(
        allPreviousContexts,
        (prevContext) => prevContext?.name === context.name
      );

      if (!previousContext) return;

      const changes = getObjectDiff(previousContext.value, context.value);
      const hasChanges = !_.isEmpty(changes);

      if (hasChanges)
        logDiffs({
          name: context.name,
          prevState: changes,
          newState: context.value,
          config
        });
    });
  }, [allPreviousContexts]);

  return null;
};

ContextLogger.propTypes = {
  contexts: PropTypes.object.isRequired,
  config: PropTypes.shape({
    objectDiffs: PropTypes.bool,
    arrayDiffs: PropTypes.bool
  })
};

export { ContextLogger };
