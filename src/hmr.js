import Root from './root'
import Redbox from 'redbox-react'
import { render } from 'react-dom'
import rootReducer from './reducers'
import { createStore } from 'redux'

// this code snippet with the hme hurts my head
const root = document.getElementById('root')
const renderApp = ({store, routes}) => {
  if (module.hot) {
    module.hot.accept('./root', () => {
      const NextRoot = require('./root').default
      render(<NextRoot store={store} routes={routes} />, root)
    })
  } else {
    render(<Root store={store} routes={routes} />, root)
  }
}

const renderError = (error) => (
render(<Redbox error={error} />, root)
)

export const renderWithHmr = ({store, routes}) => {
  if (module.hot && module.hot.accept) {
    try {
      renderApp({store, routes})
    } catch (e) {
      renderError(e)
    }
  }
}

export const configureStore = (initialState) => {
  const store = createStore(rootReducer, initialState)
  if (module.hot && module.hot.accept) {
    const nextRootReducer = require('./reducers').default
    store.replaceReducer(nextRootReducer)
  }
  return store
}
