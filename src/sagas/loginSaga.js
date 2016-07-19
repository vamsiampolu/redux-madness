import { isLoggedIn, login, logout, setToken } from '../util/auth'
import { loginSuccess, loginFailure, LOGIN, LOGOUT } from '../actions'
import { call, put, take } from 'redux-saga/effects'
import { push } from 'react-router-redux'

export default function * loginSaga () {
  while (true) {
    const {email, password} = yield take(LOGIN)
    let authenticated = yield call(isLoggedIn)
    if (!authenticated) {
      let {authenticated, token, message} = yield call(login, email, password)
      try {
        if (authenticated) {
          setToken(token)
          yield put(call(loginSuccess, {message}))
          yield take(LOGOUT)
          logout()
          yield put(call(push, '/login'))
        } else {
          yield put(call(loginFailure, {message}))
        }
      } catch (error) {
        const {message} = error
        yield put(call(loginFailure, {message}))
      }
    } else {
      yield put(call(loginSuccess, {message: 'Welcome back'}))
    }
  }
}

/*
  Auth flow:

  1. check if the user is logged in: if so, just say LOGIN_SUCCESS
  2. if not, authenticate the user,  set the token and say LOGIN_SUCCESS
  2a. there might be cases where there is no error but an invalid state such as Wrong password, Email failed validation, the user exists but password is not same, user does not exist
  2b. there might be programmer errors...
  handle 2a in else block, handle 2b in a catch block
  3. if login is successful, dispatch loginSuccess,
  3a. now we can listen for logout, remove the token once it occurs and redirect the user to login
 */
