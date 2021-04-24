import { User } from './db'

export type ListArgs = { page?: number; perPage?: number; noPaging?: boolean }

export type UserRegisterArgs = Pick<User, 'name' | 'email'>
export type UserUpdateArgs = Partial<Pick<User, 'email' | 'name'>>
