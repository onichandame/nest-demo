import { createContext } from 'react'

type State<T> = [T | null, (_: T | null) => void]

export const getState = <T>() => createContext<State<T>>([null, () => {}])
