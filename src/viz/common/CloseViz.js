import React from 'react';
import { inject, observer } from "mobx-react"
import styles from './CloseViz.css'


@inject('store') @observer
class CloseViz extends React.Component {
  	constructor(props) {
		super(props);
		this.didKeyDown = this.didKeyDown.bind(this); //bind function once
		document.addEventListener("keydown", this.didKeyDown, false)

  	}

  	didKeyDown(e) {
	    if (e.which === 27) {
	        document.removeEventListener("keydown", this.didKeyDown, false)
	        this.props.store.showResults = false
	    }
  	}

  	componentWillUnmount() {
		document.removeEventListener("keydown", this.didKeyDown, false)
	}

  	didClick() {
      this.props.store.showResults = false
    }

  	render() {
		return (
	  		<div className={styles.main} onClick={this.didClick.bind(this)}>
	  			CLOSE<br/>/esc
	  		</div>
		);
  	}

}



export default CloseViz;

