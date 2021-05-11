import { FC } from 'react'
import { Helmet } from 'react-helmet'

import { Layout } from './layout'
import { States } from './states'

export const App: FC = () => {
  return (
    <div className="App">
      <Helmet>
        <title>Nest + GraphQL Demo</title>
        <link
          rel="shortcut icon"
          href="https://cdn.kesci.com/favicon.ico"
          type="image/x-icon"
        />
      </Helmet>
      <States>
        <Layout></Layout>
      </States>
    </div>
  )
}
