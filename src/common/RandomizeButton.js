import React, { Component, PropTypes } from 'react';
import styles from './RadomizeButton.css'
import {TimelineMax, Linear} from 'gsap'


export default class RandomizeButton extends Component {

	constructor(props) {
		super(props)
		this.state={height:null}
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
		this.tl = new TimelineMax()
		for(let i=1; i<this.list.length; i++) {
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
		this.list = this.props.children.split('')
		return this.list.map((item, index)=>{
			return (<li className={styles.letter} key={index}>
						<div className={styles.sub1} ref={`subA_${index}`}>{item}</div>
						<div className={styles.sub2}>{item}</div>
					</li>)
		})
	}

	didClick() {
		if(this.props.disable) {
			return
		}else {
			this.props.didClick()
		}
	}

	render() {

		const cssUL = {height:this.state.height}

		return (
			<div className={this.props.disable ? styles.mainDisable : styles.main}>
				<div className={styles.holder} onClick={this.didClick.bind(this)} ref="letters">
					<ul className={styles.list} ref="list" style={cssUL}>
						{this.createList()}
					</ul>
				</div>
			</div>
		);
	}
}


RandomizeButton.propTypes = {
	children: PropTypes.node.isRequired,
	didClick: PropTypes.func.isRequired
}