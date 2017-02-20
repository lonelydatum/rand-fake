



import React, { Component } from 'react';
import { inject, observer } from "mobx-react"
import PieD3 from './PieD3.js'

import styles from './Pie.css'
import {TimelineMax, Power3} from 'gsap'

import weighted from 'weighted'



@inject('store') @observer
class Pie extends Component {

	constructor(props) {
		super(props)
		this.state = {rotate:360-90}
	}

	createPie(data) {

		this.pieD3.create(data)

	}

	spin() {

		const label = []
		const percent100 = []
		this.props.store.list.forEach(item=>{
			percent100.push(item.percent100)
			label.push(item.label)
		})


		const result = weighted.select(label, percent100)

		const lab = this.props.store.list.find(item=>item.label === result)



		// const extra = Math.round(Math.random()*3) * 360
		let deg = ( this.pieD3.getItem(lab.id) - 90 )

		const diff = Math.abs(deg - this.state.rotate)
		const degNew = diff < 360 ? deg + 360 : deg
		console.log(deg, diff, degNew);
		this.setState({rotate: degNew})
		// deg = `-${deg}_cw`
		// const tl = new TimelineMax()
		// tl.to(this.refs.needle, 1, {rotation:"+=360_cw"})
		// tl.to(this.refs.needle, 1, {rotation:deg, ease:Power3.easeOut})
	}

	componentDidUpdate(prevProps, prevState) {
		// console.log(this);

	}

	componentDidMount() {

		this.pieD3 = new PieD3(this.refs.pie)

		this.createPie(this.props.store.listBrute)

		this.setState({rotate: Math.random()*360})



	}

	render() {
		if(this.props.store.listBrute && this.refs.pie){
			this.createPie(this.props.store.listBrute)
		}

		console.log(this.state.rotate);
		const css = {transform: `rotate(${this.state.rotate}deg)`}
		return (
			<div className={styles.main}>
				<div className={styles.svgHolder}>
					<svg width="500" height="500">
						<g ref="pie" transform="translate(250,250)">

						</g>
					</svg>
					<div className={styles.needle} style={css} ref="needle">
						<img src="./images/arrow.svg" alt="needle" />
					</div>
				</div>
				<button className={styles.spinButton} onClick={this.spin.bind(this)}>SPIN</button>

			</div>
		);
	}
}

export default Pie