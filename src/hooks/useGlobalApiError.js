import useLocalStorage from 'hooks/useLocalStorage';

export const enableGlobalErrorKey = 'enable-global-error';
export const disableGlobalErrorCodesKey = 'disable-error-codes';

export const useGlobalApiError = () => {
  const { getItem, setItem } = useLocalStorage();

  const enable = () => setItem(enableGlobalErrorKey, 1);
  const disable = () => setItem(enableGlobalErrorKey, 0);

  const enableForAllCodes = () => {
    setItem(enableGlobalErrorKey, 1);
    setItem(disableGlobalErrorCodesKey, JSON.stringify([]));
  }
 
  const disableForCodes = (codes = []) => {
    const disabledStatuses = [];
    codes.forEach((code) => {
      if (!isNaN(Number(code))) {
        disabledStatuses.push(code);
      }
    });
    setItem(enableGlobalErrorKey, 1);
    setItem(disableGlobalErrorCodesKey, JSON.stringify(disabledStatuses));
  };

  const getDisabledErrorCodes = () => {
    const localStorageDisabledCodes = getItem(disableGlobalErrorCodesKey);
    const disabledCodes = [];
    try {
      let parsed = JSON.parse(localStorageDisabledCodes);
      if (Array.isArray(parsed)) {
        parsed.map((code) => {
          if (!isNaN(Number(code))) {
            disabledCodes.push(Number(code));
          }
        });
      }
    } catch (error) {
      console.log({ error });
    }
    return disabledCodes;
  };

  const activated = Boolean(Number(getItem(enableGlobalErrorKey)));

  return {
    enable,
    disable,
    activated,
    enableForAllCodes, 
    disableForCodes,
    getDisabledErrorCodes,
  };
};
