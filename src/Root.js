import React from 'react'
import Router, { browserHistory } from 'react-router'
import Provider from 'react-redux'

const Root = ({store, routes}) => (
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>
)

export default Root
