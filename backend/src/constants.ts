export enum RbacAction {
  QUERY = 0,
  CREATE,
  UPDATE,
  DELETE,
}

export enum ServiceName {
  AUTH = `auth`,
}

export const SEP1 = `:`
export const SEP2 = `_`
export const ClientToken = Symbol(`microservice`)

const UserServicePattern = { service: `user` }
export const UserRegisterPattern = {
  ...UserServicePattern,
  cmd: `registerUser`,
}
export const UserListPattern = { ...UserServicePattern, cmd: `list` }
