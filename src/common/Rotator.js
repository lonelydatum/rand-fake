import React, { Component } from 'react';

import {TimelineMax, Back} from 'gsap'

import styles from './Rotator.css'

export default class Rotator extends Component {

	constructor(props) {
		super(props)
		this.state = {height:null}
		this.tl = new TimelineMax({repeat:-1})
	}

	componentDidMount() {
		const item = this.refs.item_0
		this.setState({height:item.offsetHeight})
		this.startRotate(item.offsetHeight)
	}

	startRotate(height) {
		this.props.list.forEach(item=>{
			this.tl.to(this.refs.ul, .7, {y:`-=${height}`, ease:Back.easeOut, delay:3})
		})
		this.tl.set(this.refs.ul, {y:0})
	}

	getList() {
		const double = [...this.props.list, ...this.props.list]
		return double.map((item, index)=><li key={index} ref={`item_${index}`}>{item}</li>)
	}

	render() {
		const cssUL = {height:this.state.height}
		if(this.props.pause){
			this.tl.pause()
		}

		return (
			<div className={styles.main} style={cssUL}>
				<ul ref="ul">
					{this.getList()}
				</ul>
			</div>
		);
	}
}
