import React, { Component } from 'react';
import styles from './AddItem.css'
import { inject, observer } from 'mobx-react'


import LabelPercent from '../common/LabelPercent.js'
import LabelAdd from './LabelAdd.js'

import Rotator from '../common/Rotator.js'

@inject('store') @observer
export default class AddItem extends Component {

	constructor(props) {
		super(props)
		this.state = {percent:.5, label: '', pause:false}
	}


	onAdd() {

		this.props.store.createItem(this.state.label, this.state.percent)
		this.setState({percent:.5, label:'', pause:true})
	}

	percentChanged(percent) {
		this.setState({ percent })
	}

	labelChanged(label) {
		this.setState({ label })
	}


	render() {
		return (
			<div className={styles.main}>
				<div className={styles.holder}>
					<div className={styles.addYour}>
						<p ref="messageP">Add your favorite </p>
						<Rotator list={['FOOD', 'PLACES', 'COLOURS']} pause={this.state.pause} />
					</div>
					<div className={styles.ui}>
						<LabelPercent
							label={this.state.label}
							percent={this.state.percent}
							labelChanged={this.labelChanged.bind(this)}
							percentChanged={this.percentChanged.bind(this)}
						>
							<LabelAdd
								add={this.onAdd.bind(this)}
								label={this.state.label}
								labelChanged={this.labelChanged.bind(this)}/>
						</LabelPercent>
						<button
							className={styles.addButton}
							onClick={this.onAdd.bind(this)}>ADD</button>
					</div>
				</div>
			</div>
		);
	}
}

