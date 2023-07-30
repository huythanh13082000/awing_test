import Login from '../page/login'
import MyRouteProp from './MyRouteProp'

export const Route = {
  HOME: '/home',
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
    element: <>Home</>,
    private: true,
  },
]
export default Router
