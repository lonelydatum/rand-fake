import React, { Component } from 'react';
import { inject, observer } from "mobx-react"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Item from './Item.js'
import styles from './List.css'






@inject('store') @observer
export default class List extends Component {

	createList(list) {

	    return list.reverse().map((item)=> {
	    	return <Item key={item.id} data={item}/>
	    })
	}

	render() {
		const {list} = this.props.store
		return (
			<div className={styles.main}>

			<ReactCSSTransitionGroup transitionName={styles} transitionEnterTimeout={400} transitionLeaveTimeout={0}>
				{ this.createList(list) }
			</ReactCSSTransitionGroup>
			</div>
		);
	}
}


