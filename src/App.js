import React from "react"
import { Provider } from "mobx-react"


import List from './list/List.js'
import Store from './Store.js'
import styles from './App.css'
import localBin from './LocalBin.js'
import AddItem from './addItem/AddItem.js'

import Pie from './piechart/Pie.js'

const store = new Store()


localBin.addStore(store)

// localBin.fakeList()

export default class TodoList extends React.Component {


  render() {
    return (
      <Provider store={store}>
        <div className={styles.main}>
            <div>
                <AddItem />
                <List />
            </div>
            <Pie/>
        </div>
      </Provider>
      )
  }

}

