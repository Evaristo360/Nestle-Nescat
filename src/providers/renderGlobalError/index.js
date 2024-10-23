import { render, unmountComponentAtNode } from 'react-dom';
import { RootGlobalError } from 'components/RootGlobalError';
import { useGlobalApiError } from 'hooks/useGlobalApiError';
import lodash from 'lodash';

export const renderGlobalError = (error = {}) => {
  const apiError = useGlobalApiError();

  const enableGlobalError = apiError.activated;
  if (!enableGlobalError) return;
  const statusCode = lodash.get(error, 'response.status', false);
  const disabledCodes = apiError.getDisabledErrorCodes();
  if (
    statusCode &&
    disabledCodes.length > 0 &&
    disabledCodes.indexOf(statusCode) !== -1
  ) {
    // global error is disabled for this statusCode
    return;
  }
  let message = 'Ha ocurrido un error, intente de nuevo más tarde';
  if (statusCode === 401 || statusCode === 403) {
    message = 'Su usuario no cuenta con permisos para realizar esta operación';
  }

  try {
    let el = document.getElementById('global-error');
    if (el.innerHTML) {
      unmountComponentAtNode(el);
    }
    render(<RootGlobalError message={message} />, el);
  } catch (error) {
    console.log({ e: error });
  }
};
