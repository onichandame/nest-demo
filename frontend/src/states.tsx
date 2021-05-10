import { FC, useState, ContextType } from 'react'
import { ApolloProvider } from '@apollo/client'

import { GraphQLClient } from './graphqlClient'
import { Session, User } from './context'
import { sessionKey } from './constants'

export const States: FC = ({ children }) => {
  const session = useState(
    () => window.localStorage.getItem(sessionKey) || null
  )
  const user = useState<ContextType<typeof User>[0]>(null)

  return (
    <ApolloProvider client={GraphQLClient}>
      <User.Provider value={user}>
        <Session.Provider value={session}>{children}</Session.Provider>
      </User.Provider>
    </ApolloProvider>
  )
}
