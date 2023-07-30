import {takeEvery} from 'redux-saga/effects'
import {authAction} from './auth.slice'

function* loginSns() {
  yield console.log(11)
}

export default function* authSaga() {
  yield takeEvery(authAction.login.type, loginSns)
}
