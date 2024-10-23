import { decodeToken } from 'react-jwt';

export const useDoctorCheckbox = (token) => {
  const { client_id } = decodeToken(token);
  const showDoctorCheckbox = client_id && client_id === 2;

  return { showDoctorCheckbox };
};
