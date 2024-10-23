import { useContext, useEffect } from 'react';
import { MyInfoContext } from 'providers/myInfoProvider';

export const useMyInfo = (props = { onError: () => {} }) => {
  const myInfo = useContext(MyInfoContext);

  useEffect(() => {
    if (myInfo.error && props.onError) {
      props.onError();
    }
  }, [myInfo.error]);

  return myInfo;
};
