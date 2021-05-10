import { split, HttpLink, ApolloClient, InMemoryCache } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'

import { API_PATH, API_PATH_WS } from './constants'

const wsLink = new WebSocketLink({
  uri: API_PATH_WS,
  options: { reconnect: true },
})
const httpLink = new HttpLink({ uri: API_PATH })
const link = split(
  ({ query }) => {
    const def = getMainDefinition(query)
    return (
      def.kind === `OperationDefinition` && def.operation === `subscription`
    )
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({ cache: new InMemoryCache(), link })

export { client as GraphQLClient }
