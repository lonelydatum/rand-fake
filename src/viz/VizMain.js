import React from 'react';
import {inject, observer} from 'mobx-react'
import styles from './VizMain.css'

import VizEmpty from './VizEmpty.js'
import VizMapper from './VizMapper.js'


@inject('store') @observer
class VizMain extends React.Component {


	getViz() {
  		if(this.props.store.isEmpty) {
  			return <VizEmpty/>
  		} else {
  			const viz = VizMapper.getById(this.props.store.viz)
  			return <viz.node/>
  		}
  	}

  	render() {

  		const {vizOpen, __list} = this.props.store

		  return (
  			<div ref="viz" className={vizOpen ? styles.vizOpen : styles.vizClose}>
          {this.getViz()}
        </div>
		);

  	}

}



// VizMain.propTypes = {

// };


export default VizMain;

