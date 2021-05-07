import { useState, FC, useContext } from 'react'
import { IconButton, Menu, MenuItem } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import { v1 as createUid } from 'uuid'

import { Auth } from '../context'

export const Avatar: FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [menuId] = useState(createUid())
  const [user] = useContext(Auth)
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
            <MenuItem>login</MenuItem>
          </div>
        )}
      </Menu>
    </div>
  )
}
