import React, { Component } from 'react';

import styles from './RadomizeButton.css'
import weighted from 'weighted'
import { inject, observer } from 'mobx-react'

import {TimelineMax, Linear} from 'gsap'


@inject('store') @observer
export default class RandomizeButton extends Component {

	constructor(props) {
		super(props)
		this.state={height:null}
		this.prevListLength = this.props.store.list.length

	}

	componentDidUpdate(prevProps, prevState) {
		if(this.props.store.list.length > this.prevListLength) {
			this.tween()
		}
		this.prevListLength = this.props.store.list.length

	}

	spin() {
		const {store} = this.props
		const label = []
	    const percent100 = []
	    store.list.forEach(item=>{
	      percent100.push(item.percent100)
	      label.push(item.label)
	    })

	    const weightedResult = weighted.select(label, percent100)
	    const result = store.list.find(item=>item.label === weightedResult)

	    this.props.onRandomize(result)
	}



	range(min, max) {
		const diff = Math.floor(Math.random() * (max-min))
		return diff + min
	}

	componentDidMount() {

		this.tween()
		this.setState({height:this.refs.subA_0.offsetHeight})
	}

	tween() {
		// return
		this.tl = new TimelineMax()
		const total = 10
		for(let i=1; i<total; i++) {
			this.tweenItem(i)
		}
	}

	tweenItem(index) {

		const letter = this.refs.list.querySelector(`li:nth-child(${index})`)
		const height = letter.querySelector("div").offsetHeight
		const tlSub = new TimelineMax()
		const time = .4
		const total = this.range(2,7)
		for(let i=0; i<total; i++) {
			const percent = (1+i) / total
			tlSub.fromTo(letter, percent*time, {top:0}, {top:-height, ease:Linear.easeNone})
		}

		this.tl.add(tlSub, Math.random())
	}

	createList() {
		const list = 'RANDOMIZE'.split('')
		return list.map((item, index)=>{
			return (<li className={styles.letter} key={index}>
						<div className={styles.sub1} ref={`subA_${index}`}>{item}</div>
						<div className={styles.sub2}>{item}</div>
					</li>)
		})
	}

	render() {

		const styleMain = (this.props.store.list.length===0) ? styles.hide : styles.main
		const cssUL = {height:this.state.height}

		return (
			<div className={styleMain}>
				<div className={styles.holder} onClick={this.spin.bind(this)} ref="letters">
					<ul className={styles.list} ref="list" style={cssUL}>
						{this.createList()}
					</ul>
				</div>
			</div>
		);
	}
}
