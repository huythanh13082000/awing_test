import {
  Action,
  combineReducers,
  configureStore,
  getDefaultMiddleware,
  ThunkAction,
} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga'
import {authReducer} from '../feature/auth/auth.slice'

const rootReducer = combineReducers({
  authReducer: authReducer,
})

const sagaMiddleware = createSagaMiddleware()
const middleware = [...getDefaultMiddleware({thunk: false}), sagaMiddleware]

export const store = configureStore({
  reducer: rootReducer,
  middleware: middleware,
})
sagaMiddleware.run(rootSaga)
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
