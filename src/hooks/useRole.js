import useLocalStorage from './useLocalStorage';
import { role_names } from 'providers/role';

const useRole = () => {
  const { getItem } = useLocalStorage();
  const getRoleName = (role_id) =>
    role_names[role_id] || `Invalid role_id ${role_id}`;
  const role_id = Number(getItem('role_id'));
  const role_name = getRoleName(role_id);

  return {
    role_name,
    role_id
  };
};

export default useRole;
