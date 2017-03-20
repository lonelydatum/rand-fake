import React, { Component } from 'react';
import { inject, observer } from "mobx-react"
import PieD3 from './PieD3.js'
import styles from './Pie.css'
import RandomizeButton from '../../common/RandomizeButton.js'
import Giffy from '../common/Giffy.js'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

@inject('store') @observer
class Pie extends Component {

	constructor(props) {
		super(props)
		this.state = {w:0, h:0}
		this.degPrev = 360-90
		this.resultCountPrev = 0
	}


	spinNeedle() {
		const {id} = this.props.store.latestResult
		let deg = ( this.pieD3.getDegreeByItem_random(id) - 90 )
		const diff = Math.abs(deg - this.degPrev)
		const degNew = diff < 360 ? deg + 360 : deg
		this.degPrev = degNew
		return degNew
	}

	componentDidMount() {
		const wh = {w:this.refs.svgHolder.offsetWidth, h:this.refs.svgHolder.offsetHeight}
		this.pieD3 = new PieD3(this.refs.pie, this.refs.group, wh)

		this.setState({w:wh.w, h:wh.h})
	}

	closeGiffy() {
		console.log(this);
	}


	onClose() {
		this.props.store.vizOpen = false
	}


	render() {

		const {list, latestResult, results, showResults} = this.props.store

		/* eslint-disable */
      	results.length
      	/* eslint-enable */


		if(list && this.refs.pie){
			this.pieD3.create(list)
		}


		let cssNeedle = {top:this.state.h/2, left:this.state.w/2}

		if(showResults) {
			cssNeedle = {...cssNeedle, transform: `rotate(${this.spinNeedle()}deg)`, transition:'transform 1s ease' }
		}else{
			cssNeedle = {...cssNeedle, transform: `rotate(${this.degPrev}deg)`, transition:'inherit' }
		}

		return (
			<div ref="main" className={styles.main}>
				<div ref="svgHolder" className={styles.svgHolder}>
					<div className={styles.circle}></div>
					<svg ref="pie" width={this.state.w} height={this.state.h}>
						<g ref="group" transform={`translate(${this.state.w/2},${this.state.h/2})`}>

						</g>
					</svg>
					<div className={styles.needle} style={cssNeedle} ref="needle">
						<img className={styles.needleImg} src="./images/arrow.svg" alt="needle" />
					</div>
				</div>

				<div className={styles.randomize}>
					<RandomizeButton didClick={()=>this.props.store.randomize()}>
						RANDOMIZE
					</RandomizeButton>
				</div>

				<div className={styles.close}>
					<RandomizeButton didClick={this.onClose.bind(this)}>
						CLOSE
					</RandomizeButton>
				</div>


				<ReactCSSTransitionGroup
					transitionName={styles}
					transitionEnterTimeout={3000}
					transitionLeaveTimeout={300}>
					{showResults?<Giffy/>:null}
				</ReactCSSTransitionGroup>
			</div>
		);
	}
}

export default Pie