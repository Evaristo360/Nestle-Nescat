export const roles = {
  super: 1,
  nestle_admin: 2,
  nestle_operator: 3,
  client_admin: 4,
  client_operator: 5
};

export const role_names = {
  [roles.super]: 'Super',
  [roles.nestle_admin]: 'Administrador Nestlé',
  [roles.nestle_operator]: 'Operador Nestlé',
  [roles.client_admin]: 'Administrador Cliente',
  [roles.client_operator]: 'Operador Cliente'
};

export const defaultPath = {
  [roles.super]: '/nestle/analytics',
  [roles.nestle_admin]: '/nestle/analytics',
  [roles.nestle_operator]: '/nestle/analytics',
  [roles.client_admin]: '/nestle/analytics',
  [roles.client_operator]: '/nestle/analytics'
};
