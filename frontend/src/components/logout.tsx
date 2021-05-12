import { FC, useContext } from 'react'
import { gql, useMutation } from '@apollo/client'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
} from '@material-ui/core'

import { DialogProps } from '../types'

import { Session } from '../context'

const LOGOUT = gql`
  mutation logout($session: Session!) {
    logout(session: $session)
  }
`

export const Logout: FC<DialogProps> = ({ open, onClose }) => {
  const [session] = useContext(Session)
  const [logout] = useMutation<{}, { session: typeof session }>(LOGOUT, {
    variables: { session },
  })
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Logout</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to logout?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="default" onClick={onClose}>
          cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => logout().then(onClose)}
        >
          logout
        </Button>
      </DialogActions>
    </Dialog>
  )
}
