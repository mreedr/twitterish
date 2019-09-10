import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store'
import App from './App'
import Update from './Update'
import Login from './Login'
import Notfound from './404'
import { Switch, BrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'

import 'semantic-ui-css/semantic.min.css'
import './index.css'

ReactDOM.render(
  <Provider store={configureStore()}>
    <BrowserRouter>
      <Switch>
        <Layout exact path="/" component={App} />
        <Layout exact path="/404" component={Notfound} />
        <Layout exact path="/:username" component={App} />
        <Layout exact path="/:username/:chrrpId" component={Update} />
        <Layout exact path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

// registerServiceWorker();
