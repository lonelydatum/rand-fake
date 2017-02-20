import { autorun } from "mobx"

class LocalBin {

	constructor() {
		if(this.list === null) {
			this.list = []
		}
	}

	addStore(store) {
		autorun(()=>{
			this.list = store.listBrute
		})
	}


	fakeList() {
		const obj = [{label:"fakeONE", id: 8, percent:.2}, {label:"fakeTWO", id: 97, percent:.2}]
		const str = JSON.stringify(obj)

		localStorage.setItem("list", str)
	}


	get list() {
		return JSON.parse(localStorage.getItem("list"))
	}

	set list(list) {
		const str = JSON.stringify(list)
		localStorage.setItem("list", str)
	}


}

export default new LocalBin()


