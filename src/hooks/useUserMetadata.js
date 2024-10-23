import _ from 'lodash';
import { useMyInfo } from 'hooks/useMyInfo';

const useUserMetadata = ({ onError }) => {
  const myInfo = useMyInfo({ onError });
  return myInfo;
};

export default useUserMetadata;
