import { observable, computed } from "mobx"
import LocalBin from './LocalBin.js'
import weighted from 'weighted'
import _ from 'lodash'

class Item {
  @observable label
  @observable id
  @observable percent

  constructor(label, percent, id) {
    this.id = id
    this.label = label
    this.percent = percent
    this.percent100 = 0
  }
}


class Store {
  @observable __list = []
  @observable editId = -1
  @observable results = []
  @observable vizOpen = false
  @observable __viz = LocalBin.viz
  @observable showResults = false


  constructor() {
    this.idCounter = 0
    this.createList(LocalBin.list)
  }



  @computed get isEmpty() {
    return this.__list.length===0
  }

  @computed get latestResult() {
    return _.last(this.results)
  }

  @computed get viz() {
    return this.__viz
  }

  set viz(value) {
    this.__viz = value
  }


  @computed get list() {
    let count = 0
    this.__list.map(item=>{
      count += item.percent
      return item
    })



    return this.__list.map((item)=>{
      /* eslint-disable */
      const a = item.label
      const b = item.percent
      /* eslint-enable */
      item.percent100 = item.percent / count
      return item
    })
  }

  createList(list) {
    list.forEach((item) => {
      this.addItem(item.label, item.percent)
    })
  }

  addItem(label, percent) {
    const item = new Item(label, percent, this.idCounter)
    this.__list = this.__list.concat(item)
    this.idCounter++
  }

  deleteItem(id) {
    this.__list = this.__list.filter(item => item.id!==id)
  }

  changeLabel(id, label) {
    this.__list.map((item)=>{
      if(item.id===id) {
        item.label = label
      }
      return item
    })
  }

  changePercent(id, percent) {
    this.__list.map((item)=>{
      if(item.id===id) {
        item.percent = percent
      }
      return item
    })
  }




  randomize() {
    const label = []
    const percent100 = []
    this.__list.forEach(item=>{
      percent100.push(item.percent100)
      label.push(item.label)
    })

    const weightedResult = weighted.select(label, percent100)
    const item = this.__list.find(item=>item.label === weightedResult)
    this.results.push(item)
    this.showResults = true
  }
}



export default Store
