import { FC } from 'react'

import { Navbar } from './navbar'

export const Layout: FC = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}
