import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import { Provider } from 'react-redux'
import store from './store/store'
import './css/normalize.css'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
  <Provider store={store}>
    <App/>
  </Provider>,
)
