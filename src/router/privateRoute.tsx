import {Navigate} from 'react-router-dom'
import MyRouteProp from './MyRouteProp'
import RoleRoute from './roleRoute'
import { Route } from './routes'
interface Props {
  item: MyRouteProp
}
function PrivateRoute(props: Props) {
  const token = localStorage.getItem('accessToken')
  if (token) {
    if (props.item.roles && props.item.roles.length > 0) {
      return <RoleRoute item={props.item} />
    } else {
      return <>{props.item.element}</>
    }
  } else {
    return <Navigate to={{pathname: Route.LOGIN}} />
  }
}

export default PrivateRoute
