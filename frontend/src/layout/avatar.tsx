import { useState, FC, useContext } from 'react'
import { IconButton, Menu, MenuItem } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import { v1 as createUid } from 'uuid'

import { DialogProps } from '../types'
import { Login, Logout } from '../components'
import { User } from '../context'

const LogDialog: FC<DialogProps> = args => {
  const [user] = useContext(User)
  if (user) return <Logout {...args} />
  else return <Login {...args} />
}

export const Avatar: FC = () => {
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [menuId] = useState(createUid())
  const [user] = useContext(User)
  const onMenuItemClicked = () => setAnchorEl(null)
  const onDialogOpen = () => {
    setOpen(true)
    onMenuItemClicked()
  }
  const onDialogClose = () => setOpen(false)
  return (
    <div>
      <IconButton
        onClick={e => setAnchorEl(e.currentTarget)}
        aria-controls={menuId}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        open={!!anchorEl}
        id={menuId}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: `bottom`, horizontal: `right` }}
        transformOrigin={{ vertical: `top`, horizontal: `left` }}
        getContentAnchorEl={null}
        keepMounted
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem button onClick={onDialogOpen}>
          {!!user ? `logout` : `login`}
        </MenuItem>
      </Menu>
      <LogDialog open={open} onClose={onDialogClose} />
    </div>
  )
}
