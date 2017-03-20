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
		this.state = {percent:.5, label: '', showHint:true, blurHint:false, invalid:null}
	}


	onAdd() {
		if(this.state.label.length > 0) {
			this.props.store.addItem(this.state.label, this.state.percent)
			this.setState({percent:.5, label:'', invalid:null})
		}else{
			this.setState({invalid:'You gotta say something'})
		}

	}

	percentChanged(percent) {
		this.setState({ percent })
	}

	labelChanged(label) {
		this.setState({ label, showHint:false, invalid:null })
	}

	didFocus() {
		this.setState({blurHint:true})
	}
	didBlur() {
		this.setState({invalid:null, blurHint:false})
	}


	render() {


		let blurHint

		if(this.state.label) {
			blurHint = {opacity:0}
		}else {
			blurHint = this.state.blurHint ? {opacity:.2} : {opacity:1}
		}


		return (
			<div className={styles.main}>
				<div className={styles.holder}>
					<div className={styles.addYour} style={blurHint}>
						<p ref="messageP">Add your favorite </p>
						<Rotator list={['FOOD', 'PLACES', 'COLOURS']}  />
					</div>
					<div className={styles.ui}>
						<LabelPercent
							label={this.state.label}
							percent={this.state.percent}
							labelChanged={this.labelChanged.bind(this)}
							percentChanged={this.percentChanged.bind(this)}
						>
							<LabelAdd
								invalid={this.state.invalid}
								didBlur={this.didBlur.bind(this)}
								didFocus={this.didFocus.bind(this)}
								add={this.onAdd.bind(this)}
								label={this.state.label}
								labelChanged={this.labelChanged.bind(this)}
							/>
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

