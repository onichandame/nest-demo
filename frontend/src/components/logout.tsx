import { FC } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
} from '@material-ui/core'

import { DialogProps } from '../types'

export const Logout: FC<DialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Logout</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to logout?</DialogContentText>
      </DialogContent>
    </Dialog>
  )
}
