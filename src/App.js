import React from "react"
import { Provider } from "mobx-react"


import List from './list/List.js'
import Store from './Store.js'
import styles from './App.css'
import localBin from './LocalBin.js'
import AddItem from './addItem/AddItem.js'

import Pie from './viz/piechart/Pie.js'
// import About from './about/About.js'
import RandomizeButton from './common/RandomizeButton.js'


const store = new Store()
localBin.addStore(store)


export default class Randomize extends React.Component {

  constructor(props) {
    super(props)
    this.state = {selected:null}
  }

  onRandomize(result) {
    this.setState({selected: result})
  }



  render() {
    return (
      <Provider store={store}>
        <div className={styles.main}>
            <div className={styles.rawData}>
                <AddItem />
                <List />
                <RandomizeButton onRandomize={this.onRandomize.bind(this)} />
            </div>
            <div className={styles.viz}>
              <Pie selected={this.state.selected} random={Math.random()} />

            </div>

        </div>
      </Provider>
      )
  }

}

