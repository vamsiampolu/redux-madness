import { LOGIN, LOGOUT, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions'

export default function userReducer (state = {} , action) {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, {isFetching: true, authenticated: false, message: action.message})
    case LOGIN_FAILURE:
    case LOGOUT:
      return Object.assign({}, state, {isFetching: false, authenticated: false, meesage: action.message})
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {isFetching: false, authenticated: true, message: action.message})
    default:
      return state
  }
}
