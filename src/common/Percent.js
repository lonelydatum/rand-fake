import React, { Component } from 'react';
import { inject, observer } from "mobx-react"

import styles from './Percent.css'


@inject('store') @observer
class Percent extends Component {

	changePercent(e) {
		this.props.percentChanged(parseFloat(e.target.value) )
	}


	render() {
		return (
			<div className={styles.main}>
				<input
					type="range"
					value={this.props.percent}
					min=".1"
					max="1"
					step=".1"
					onChange={this.changePercent.bind(this)} />
			</div>
		);
	}
}

Percent.propTypes = {
	percent: React.PropTypes.number.isRequired,
	percentChanged: React.PropTypes.func.isRequired
}

export default Percent

 // onChange={this.changePercent.bind(this)}