import { useState } from 'react';

const usePerms = () => {
  const [labelsPerms, setLabelsPerms] = useState({});

  const setPerms = ({ advertisements, surveys, management }) => {
    let perms = [];

    if (advertisements) {
      perms.push('Anuncios');
    }

    if (surveys) {
      perms.push('Encuestas');
    }

    if (management) {
      perms.push('Administración');
    }

    setLabelsPerms({
      ...labelsPerms,
      perms: perms.join(', ')
    });
  };

  const setRol = (rol) => {
    let role = rol;

    if (rol === 'employee') {
      role = 'Empleado';
    }

    setLabelsPerms({
      ...labelsPerms,
      rol: role
    });
  };

  return {
    setPerms,
    setRol,
    labelsPerms
  };
};

export default usePerms;
