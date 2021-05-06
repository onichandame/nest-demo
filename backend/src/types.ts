import { User } from './db'

export enum Verb {
  UNKOWN = -1,
  READ,
  CREATE,
  UPDATE,
  DELETE,
}

export type Context = {
  userPromise?: Promise<User | null>
  verb: Verb
  session?: string
}
