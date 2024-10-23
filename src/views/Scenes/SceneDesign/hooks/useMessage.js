import { useIntl } from 'react-intl';
import _ from 'lodash-es';

const useMessages = (messages) => {
  const { formatMessage } = useIntl();

  const getMessage = (id) => formatMessage(_.get(messages, id));

  return { getMsg: getMessage };
};

export { useMessages };
