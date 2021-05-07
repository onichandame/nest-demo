import { getState } from './state'

type User = {
  id: string
  name: string
  email?: string
  role?: number[]
}

const Auth = getState<User>()

export { Auth }
