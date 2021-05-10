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
  const [validateSession] = useLazyQuery(VALIDATE_SESSION, {
    fetchPolicy: `standby`,
    variables: { session },
    onCompleted: data => {
      console.log(data)
    },
    onError: e => {
      setSession(null)
      setUser(null)
      console.error(e)
      throw e
    },
  })
  useEffect(() => {
    if (session) validateSession()
  }, [session, validateSession])
  return <div>{children}</div>
}
