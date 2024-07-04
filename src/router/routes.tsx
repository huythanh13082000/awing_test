import Home from '../page/home'
import Login from '../page/login'
import MyRouteProp from './MyRouteProp'

export const Route = {
  HOME: '/',
  LOGIN: '/login',
}

const Router: Array<MyRouteProp> = [
  {
    path: Route.LOGIN,
    element: <Login />,
    private: false,
  },
  {
    path: Route.HOME,
    element: <Home />,
    private: false,
  },
]
export default Router
