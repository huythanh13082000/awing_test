import {Route, Routes} from 'react-router-dom'
import MyRouteProp from './MyRouteProp'
import PrivateRoute from './privateRoute'
import routes from './routes'

const Router = () => {
  return (
    <Routes>
      {routes.map((item: MyRouteProp) => {
        if (item.private) {
          return (
            <Route
              key={item.path}
              {...item}
              element={<PrivateRoute item={item} />}
            />
          )
        } else {
          return <Route key={item.path} {...item} />
        }
      })}
    </Routes>
  )
}
export default Router
