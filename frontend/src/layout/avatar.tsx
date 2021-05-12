import { useState, FC, useContext } from 'react'
import { IconButton, Menu, MenuItem } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import { v1 as createUid } from 'uuid'

import { Login, Logout } from '../components'
import { User } from '../context'

export const Avatar: FC = () => {
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [menuId] = useState(createUid())
  const [user] = useContext(User)
  const onClickedItem = () => {
    setOpen(false)
    setAnchorEl(null)
  }
  const onMenuClose = () => setOpen(false)
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
        {!!user ? (
          <div>
            <MenuItem>logout</MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem onClick={onClickedItem}>login</MenuItem>
          </div>
        )}
      </Menu>
      {!!user ? (
        <Logout open={open} onClose={onMenuClose} />
      ) : (
        <Login open={open} onClose={onMenuClose} />
      )}
    </div>
  )
}
