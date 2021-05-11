import { FC, useEffect, useContext } from 'react'
import { useLazyQuery, gql } from '@apollo/client'

import { User, Session } from '../context'

const VALIDATE_SESSION = gql`
  query validateSession($session: String!) {
    validateSession(session: $session) {
      id
      name
      email
    }
  }
`

export const Auth: FC = ({ children }) => {
  const [session, setSession] = useContext(Session)
  const [, setUser] = useContext(User)
  const [validateSession, { data, error }] = useLazyQuery<{
    validateSession: { id: string; name: string; email?: string }
  }>(VALIDATE_SESSION, {
    variables: { session },
    onError: e => {
      console.error(e)
      throw e
    },
  })
  useEffect(() => {
    if (error) {
      if (session) setSession(null)
      setUser(null)
    } else if (data) {
      setUser(data.validateSession)
    }
  }, [data, error, session, setSession, setUser])

  useEffect(() => {
    if (session) validateSession()
  }, [session, validateSession])
  return <div>{children}</div>
}
