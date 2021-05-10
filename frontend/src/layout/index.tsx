import { FC } from 'react'

import { Navbar } from './navbar'
import { Auth } from './auth'

export const Layout: FC = ({ children }) => {
  return (
    <div>
      <Auth />
      <Navbar />
      {children}
    </div>
  )
}
