export const ROLE_TYPE = {
  ADMIN: 1,
  ADMIN_STORE: 2,
  USER: 3,
};

export const PERMISSIONS = {
  ALL: [ROLE_TYPE.ADMIN, ROLE_TYPE.ADMIN_STORE, ROLE_TYPE.USER],
  DASHBOARD_MANAGER: [ROLE_TYPE.ADMIN],
};