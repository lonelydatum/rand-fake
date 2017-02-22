import React, { Component } from 'react';
import { inject, observer } from "mobx-react"
import PieD3 from './PieD3.js'
import styles from './Pie.css'

@inject('store') @observer
class Pie extends Component {

	constructor(props) {
		super(props)
		this.state = {rotate:360-90}
		this.wh = {w:600, h:600}
	}

	createPie(data) {
		this.pieD3.create(data)
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.random !== this.props.random) {
			this.spinNeedle()
		}
	}

	spinNeedle() {
		const {selected} = this.props
		let deg = ( this.pieD3.getDegreeByItem_random(selected.id) - 90 )

		const diff = Math.abs(deg - this.state.rotate)
		const degNew = diff < 360 ? deg + 360 : deg

		this.setState({rotate: degNew, counter:this.state.counter+1})
	}

	componentDidMount() {
		this.pieD3 = new PieD3(this.refs.pie, this.refs.group, this.wh)
		this.createPie(this.props.store.listBrute)
	}

	render() {

		if(this.props.store.listBrute && this.refs.pie){
			this.createPie(this.props.store.listBrute)
		}

		let css = {transform: `rotate(${this.state.rotate}deg)`, top:this.wh.h/2, left:this.wh.w/2}


		return (
			<div className={styles.main}>
				<div className={styles.svgHolder}>
					<div className={styles.circle}></div>
					<svg ref="pie" width="600" height="600">
						<g ref="group" transform={`translate(${this.wh.w/2},${this.wh.h/2})`}>

						</g>
					</svg>
					<div className={styles.needle} style={css} ref="needle">
						<img className={styles.needleImg} src="./images/arrow.svg" alt="needle" />
					</div>
				</div>


			</div>
		);
	}
}

export default Pie