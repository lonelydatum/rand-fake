import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {inject, observer} from 'mobx-react'
import {autorun} from 'mobx'
import styles from './Oscar.css'
import {TimelineMax} from 'gsap'
import OscarResults from './OscarResults.js'


@inject('store') @observer
class Oscar extends React.Component {
  	constructor(props) {
		super(props);
		this.total = 67
		this.state = {showFrameIndex:1}
  	}

  	componentDidMount() {
  		this.createImages()
  		this.animate()

  		autorun(()=>{
  			/* eslint-disable */
  			this.props.store.list.length
  			/* eslint-enable */
  			this.animate()
  		})
  	}

  	createImages() {
  		const images = []

  		for(let i=1;i<=this.total;i++) {
  			const url = `images/oscar/oscar${i}.png`
  			const cssFrame = this.state.showFrameIndex===i ? styles.frameShow : styles.frame
  			images.push(<img key={i} className={cssFrame} src={url} alt="oscar" />)

  		}
  		return images
  	}

  	animate() {
  		this.setState({showFrameIndex:1})
  		const tlMain = new TimelineMax()
  		const tlLoopItem = new TimelineMax({repeat:this.total-1})
  		tlLoopItem.addCallback(()=>{
  			const nextFrame = this.state.showFrameIndex >= this.total ? this.total : this.state.showFrameIndex+1
  			this.setState({showFrameIndex:nextFrame})
  		}, .035)
  		tlMain.add(tlLoopItem)
  	}

  	render() {

  		const {showResults} = this.props.store

		return (
	  		<div className={styles.main}>
	  			<div className={styles.images}>
	  				{this.createImages()}
	  			</div>

	  			<ReactCSSTransitionGroup
					transitionName={styles}
					transitionEnterTimeout={1000}
					transitionLeaveTimeout={300}>
					{showResults ? <OscarResults/> : null}
				</ReactCSSTransitionGroup>

	  		</div>
		);
  	}

}




export default Oscar;

