import React from 'react'
import Router from 'react-router'
import Provider from 'react-redux'

const Root = ({store, routes, history}) => (
  <Provider store={store}>
    <Router routes={routes} history={history} />
  </Provider>
)

export default Root
