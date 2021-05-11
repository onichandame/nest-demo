import { useContext, useEffect, FC } from 'react'
import * as yup from 'yup'
import { gql, useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core'

import { DialogProps } from '../types'
import { Session } from '../context'

const LOGIN = gql`
  mutation login($name: String!, $pass: String!) {
    login(nameOrEmail: $name, password: $pass) {
      session
    }
  }
`

export const Login: FC<DialogProps> = ({ open, onClose }) => {
  const [, setSession] = useContext(Session)
  const schema = yup
    .object({
      name: yup.string().default(``).required().label(`username or email`),
      pass: yup.string().default(``).required().label(`password`),
    })
    .required()

  const formik = useFormik<yup.Asserts<typeof schema>>({
    initialValues: schema.getDefault(),
    onSubmit: async (_, helpers) => {
      helpers.setSubmitting(true)
      await login()
      helpers.setSubmitting(false)
    },
    validationSchema: schema,
  })

  const [login, { data, error }] = useMutation<
    { login: { session: string } },
    { name: string; pass: string }
  >(LOGIN, { variables: formik.values })

  useEffect(() => {
    if (data?.login.session) {
      setSession(data.login.session)
      onClose()
    }
  }, [onClose, data, setSession])

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        {error && (
          <DialogContentText color="error">{error.message}</DialogContentText>
        )}
        <DialogContentText>Login to Heywhale</DialogContentText>
        <TextField
          name="name"
          onChange={formik.handleChange}
          placeholder="username or email"
          type="email"
          value={formik.values.name}
        />
        <TextField
          name="pass"
          onChange={formik.handleChange}
          placeholder="pasword"
          type="password"
          value={formik.values.pass}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={() => formik.submitForm()} color="primary">
          Login
        </Button>
      </DialogActions>
    </Dialog>
  )
}
