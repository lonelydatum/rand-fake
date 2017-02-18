import React, { Component } from 'react';
import { inject, observer } from "mobx-react"

import Item from './Item.js'
import styles from './List.css'



@inject('store') @observer
export default class List extends Component {



	createList(list) {
	    return list.map((item)=> {

	    	return <Item key={item.id} data={item}/>
	    })
	}


	render() {
		const {list} = this.props.store
		return (
			<div className={styles.main}>
				{ this.createList(list) }

			</div>
		);
	}
}

