import {Button, TextField} from '@mui/material'
import {useAppDispatch} from '../../app/hooks'
import {authAction} from '../../feature/auth/auth.slice'
import {styled} from '@mui/system'

const ButtonCustom = styled(Button)({
  backgroundColor: 'blue',
  '&>p': {
    color: 'red',
  },
})

const Login = () => {
  const dispatch = useAppDispatch()
  const login = () => {
    dispatch(authAction.login())
  }
  return (
    <div>
      <TextField id='outlined-basic' label='Outlined' variant='outlined' />
      <ButtonCustom className='login_button' onClick={login}>
        <p>Login </p>
      </ButtonCustom>
    </div>
  )
}

export default Login
