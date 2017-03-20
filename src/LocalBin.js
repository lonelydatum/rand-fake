import { autorun } from "mobx"

class LocalBin {

	constructor() {
		if(this.list === null) {
			this.list = []
		}
	}

	addStore(store) {
		autorun(()=>{
			this.list = store.list
			this.viz = store.viz
		})
	}


	fakeList() {
		const obj = [{label:"fakeONE", id: 8, percent:.2}, {label:"fakeTWO", id: 97, percent:.2}]
		const str = JSON.stringify(obj)

		localStorage.setItem("list", str)
	}

	get viz() {

		return localStorage.getItem("viz")
	}

	set viz(v) {
		localStorage.setItem("viz", v)
	}


	get list() {
		const li = JSON.parse(localStorage.getItem("list"))
		return li
	}

	set list(list) {
		const str = JSON.stringify(list)
		localStorage.setItem("list", str)
	}


}

export default new LocalBin()


