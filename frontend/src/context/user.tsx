import { getState } from './state'

const User = getState<{
  id: string
  name: string
  email?: string
  role?: number[]
}>()

export { User }
