import React, { Component } from 'react'
import { inject, observer } from "mobx-react"
import styles from './Item.css'

import LabelPercent from '../common/LabelPercent.js'
import LabelItem from './LabelItem.js'

@inject('store') @observer
export default class Item extends Component {

	constructor(props) {
		super(props);
		this.state = {isEdit:false}
	}

	onDelete() {
		const {data} = this.props
		this.props.store.deleteItem( data.id )
	}

	onEdit() {
		this.props.store.editId = this.props.data.id
	}

	percentChanged(percent) {
		this.props.store.changePercent(this.props.data.id, percent)
	}

	labelChanged(label) {
		this.props.store.changeLabel(this.props.data.id, label)
	}

	render() {
		const { data } = this.props


		return (
			<div className={styles.main}>

				<LabelPercent
					label={data.label}
					percent={data.percent}
					labelChanged={this.labelChanged.bind(this)}
					percentChanged={this.percentChanged.bind(this)}
					id={data.id}
				>
					<LabelItem
						id={data.id}
						label={data.label}
						labelChanged={this.labelChanged.bind(this)}/>
				</LabelPercent>

				<div className={styles.buttons}>
					<button className={styles.edit} onClick={this.onEdit.bind(this)}>
						<i className="fa fa-pencil" aria-hidden="true"></i>
					</button>
					<button className={styles.delete} onClick={this.onDelete.bind(this)}>
						<i className="fa fa-trash-o" aria-hidden="true"></i>
					</button>

				</div>
			</div>
		);
	}
}
