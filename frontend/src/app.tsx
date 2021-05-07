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
          sizes="16x16"
        />
      </Helmet>
      <States>
        <Layout></Layout>
      </States>
    </div>
  )
}
