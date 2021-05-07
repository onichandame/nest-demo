import { FC } from 'react'
import { AppBar, Toolbar, IconButton } from '@material-ui/core'

import { Icon } from '../icon'
import { Avatar } from './avatar'

export const Navbar: FC = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton>
          <Icon />
        </IconButton>
        <div style={{ flexGrow: 1 }} />
        <Avatar />
      </Toolbar>
    </AppBar>
  )
}
