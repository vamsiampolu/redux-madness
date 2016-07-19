import { renderWithHmr, configureStore } from './hmr'
import routes from './routes'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

const store = configureStore({})
const history = syncHistoryWithStore(browserHistory, store)

if (module.hot) {
  module.hot.accept('./Root', () => {
    setTimeout(() => renderWithHmr({routes, store, history}), 0)
  })
}

renderWithHmr({routes, store})
