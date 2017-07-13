import React from 'react';
import {inject, observer} from 'mobx-react'
import styles from './OscarResults.css'
import CloseViz from '../common/CloseViz.js'


@inject('store') @observer
class OscarResults extends React.Component {


  	 didClick() {
      this.props.store.showResults = false
    }

  	render() {

  		const {latestResult} = this.props.store

  		const css = {backgroundImage:`url(oscar-card.jpg)`}

  		// const sizeResult = 175
  		const sizeCard = 620
  		// const ratio = sizeResult / sizeCard

  		// const newSizeResult = window.innerWidth * ratio
  		const scale = window.innerWidth / sizeCard
  		console.log(scale);

  		const cssResult = {transform: `scale(${scale}) rotate(-2deg) translateX(${9*scale}px)`}


		return (
	  		<div className={styles.main} style={css}>
	  			<div className={styles.result} style={cssResult}>{latestResult.label}</div>
	  			<CloseViz/>
	  		</div>

		);
  	}

}



export default OscarResults;

