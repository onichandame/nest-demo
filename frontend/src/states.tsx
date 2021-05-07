import { FC, useState, ContextType } from 'react'

import { Auth } from './context'

export const States: FC = ({ children }) => {
  const auth = useState<ContextType<typeof Auth>[0]>(null)
  return <Auth.Provider value={auth}>{children}</Auth.Provider>
}
