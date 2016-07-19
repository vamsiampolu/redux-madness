import user from './user'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({user, routing})

export default rootReducer
