import { observable, computed } from "mobx"
import LocalBin from './LocalBin.js'

class Item {
  @observable label
  @observable id
  @observable percent

  constructor(label, percent, id) {
    this.id = id
    this.label = label
    this.percent = percent
  }
}


class Store {

  @observable list = []
  @observable editId = -1

  constructor() {
    this.idCounter = 0
    this.createList(LocalBin.list)
  }

  deleteItem(id) {
    const newList = this.list.filter(item => item.id!==id)
    this.list.replace(newList)
    // this.updateLocalBin()
  }

  @computed get listBrute() {

    return this.list.map((item)=>{
      /* eslint-disable */
      const a = item.label
      const b = item.percent
      /* eslint-enable */
      return item
    })
  }

  createItem(label, percent) {
    this.list.push(new Item(label, percent, this.idCounter))
    this.idCounter++
    // this.updateLocalBin()
  }


  changeLabel(id, label) {
    this.list.map((item)=>{
      if(item.id===id) {
        item.label = label
      }
      return item
    })
    // this.updateLocalBin()
  }

  changePercent(id, percent) {
    this.list.map((item)=>{
      if(item.id===id) {
        item.percent = percent
      }
      return item
    })
    // this.updateLocalBin()
  }

  createList(list) {
    list.forEach((item) => {
      this.createItem(item.label, item.percent)
    })
  }

  updateLocalBin() {
    LocalBin.list = this.list
  }



}



export default Store

// class Todo {
//   @observable value
//   @observable id
//   @observable complete

//   constructor(value) {
//     this.value = value
//     this.id = Date.now()
//     this.complete = false
//   }
// }

// export class TodoStore {
//   @observable todos = []
  // @observable filter = ""
  // @computed get filteredTodos() {
  //   console.log(this.todos);
  //   this.list = []
  //   var matchesFilter = new RegExp(this.filter, "i")
  //   return this.todos.filter(todo => !this.filter || matchesFilter.test(todo.value))
  // }



  // createTodo(value) {
  //   this.todos.push(new Todo(value))
  // }

  // clearComplete = ()=> {
  //   const incompleteTodos = this.todos.filter(todo => !todo.complete)
  //   this.todos.replace(incompleteTodos)
  // }
// }

// export default new TodoStore

