import React, { Component } from 'react';
import { inject, observer } from "mobx-react"

import styles from './Percent.css'


@inject('store') @observer
class Percent extends Component {

	constructor(props) {
		super(props);
		this.total = 5
		this.state = {selected:Math.floor(this.props.percent*this.total)-1}
	}

	onHearted(index) {
		const percent = (index+1) / this.total
		this.props.percentChanged(percent)
		this.setState({selected:index})
	}

	makeLove() {
		let hearts = []
		let cssOn = {color:'red'}

		for(let i=0; i<this.total; i++) {
			const css = i <= this.state.selected ? {...cssOn, opacity:1} : {...cssOn, opacity:.2}
			const heart = <i
				className="fa fa-heart"
				aria-hidden="true"
				key={i}
				style={css}
				onClick={this.onHearted.bind(this, i)}></i>
			hearts.push(heart)
		}

		return hearts
	}


	render() {
		return (
			<div className={styles.main}>
				<div className={styles.hearts}>
					{this.makeLove()}
				</div>
			</div>
		);
	}
}

Percent.propTypes = {
	percent: React.PropTypes.number.isRequired,
	percentChanged: React.PropTypes.func.isRequired
}

export default Percent

 // <div className={styles.main}>
	// 			<input
	// 				type="range"
	// 				value={this.props.percent}
	// 				min=".1"
	// 				max="1"
	// 				step=".1"
	// 				onChange={this.changePercent.bind(this)} />
	// 		</div>