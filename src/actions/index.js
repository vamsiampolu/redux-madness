/*
  a redux store and redux-actions for using our fake login API:

      LOGIN
      LOGIN_SUCCESS
      LOGIN_FAILURE
      REQUIRE_LOGIN
      LOGOUT
 */

export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const REQUIRE_LOGIN = 'REQUIRE_LOGIN'
export const LOGIN_STATUS = 'LOGIN_STATUS'
export const LOGOUT = 'LOGOUT'

export function login ({email, password}) {
  return {type: LOGIN, email, password, message: 'Please wait, authenticating'}
}

export function loginSuccess ({ message = 'Login successful' }) {
  return {type: LOGIN_SUCCESS, message}
}

export function loginFailure ({ message = 'Login failed' }) {
  return {type: LOGIN_FAILURE, message}
}

export function loginStatus () {
  return {type: LOGIN_STATUS}
}

export function requireLogin () {
  return {type: REQUIRE_LOGIN}
}

export function logout () {
  return {type: LOGOUT}
}

// I  dont know how I will implement any of these but I know what I want to do,
// this is a good starting point, just knowing what you want to do
// Now I need to figure out the integration between redux and react-router's onEnter callback

// Here, we come to `react-router-redux`, this has a couple of moving parts:
// 1. a middleware we need to use(done)
// 2. a reducer we need to add (done)
// 3. wrap the history with syncHistoryWithStore(history,store) (done)
// 4. actions that we have to use such as {push, replace, go, goForward, goBack}
// 5. the next question is can we dispatch from the react-router onEnter hook
//
// The most important thing to consider here is the state shape:
// {user,routing}
//
// Additional middleware that I want to use: redux-logger and redux-saga
//
//

// the next part will be completely bonkers, we will setup blocking sagas for the entire login routine
