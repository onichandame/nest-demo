import { createContext } from 'react'

type State<T> = [T | null, ((_: T) => void) | null]

export const getState = <T>() => createContext<State<T>>([null, null])
