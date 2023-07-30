// phân role users
import MyRouteProp from './MyRouteProp'
interface Props {
  item: MyRouteProp
}
function RoleRoute(props: Props) {
  const role = 'user'
  const {item} = props
  const check = item.roles?.includes(role)
  return <>{check ? props.item.element : <></>}</>
}

export default RoleRoute
