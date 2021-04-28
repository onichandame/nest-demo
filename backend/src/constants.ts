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

export const SESSION_TTL = 60 * 60 * 24 * 1.5

export const ClientToken = Symbol(`microservice`)

const UserServicePattern = { service: `user` }
export const UserRegisterPattern = {
  ...UserServicePattern,
  cmd: `registerUser`,
}
export const UserListPattern = { ...UserServicePattern, cmd: `list` }

const AuthenticatePattern = { service: `authenticate` }
export const AuthenticateLoginPattern = { ...AuthenticatePattern, cmd: `login` }
export const AuthenticateUpdatePassPattern = {
  ...AuthenticatePattern,
  cmd: `updatePass`,
}
