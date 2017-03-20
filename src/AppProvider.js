import React from 'react';
import { Provider } from "mobx-react"

import App from './App.js'

import Store from './Store.js'
import localBin from './LocalBin.js'

const store = new Store()
localBin.addStore(store)

window.store = store

export default class AppProvider extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
      )
  }
}



