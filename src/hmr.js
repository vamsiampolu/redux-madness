import React from 'react'
import Root from './root'
import Redbox from 'redbox-react'
import { render } from 'react-dom'
import rootReducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { createSagaMiddleware } from 'redux-saga'
import rootSaga from './sagas'

// this code snippet with the hme hurts my head
const root = document.getElementById('root')
export const renderApp = ({store, routes, history}) => {
  const Root = require('./root').default
  render(<Root store={store} routes={routes} history={history} />, root)
}

export const renderError = (error) => render(<Redbox error={error} />, root)

export const renderWithHmr = ({store, routes, history}) => {
  try {
    renderApp({store, routes, history})
  } catch (e) {
    renderError(e)
  }
}

export const configureStore = (initialState) => {
  const logger = createLogger()
  const sagaMiddleware = createSagaMiddleware()
  const enhancers = applyMiddleware(logger, sagaMiddleware)
  const store = createStore(rootReducer, initialState, enhancers)
  sagaMiddleware.run(rootSaga)
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
