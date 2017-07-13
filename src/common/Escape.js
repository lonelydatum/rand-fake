class Escape{
	constructor(callback) {
		this.callback = callback
		this.didKeyDown = this.didKeyDown.bind(this); //bind function once
	}

	on(){
		document.addEventListener("keydown", this.didKeyDown, false)
	}

	off(){
		document.removeEventListener("keydown", this.didKeyDown, false)
	}

	didKeyDown(e) {
	    if (e.which === 27) {
	        document.removeEventListener("keydown", this.didKeyDown, false)
	        this.callback()
	        // this.props.store.showResults = false
	    }
  	}

}

export default Escape