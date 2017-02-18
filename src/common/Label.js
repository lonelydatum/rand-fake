import React, { Component } from 'react';
import { inject, observer } from "mobx-react"

import styles from './Label.css'


@inject('store') @observer
class Label extends Component {




	changed(e) {
		this.props.labelChanged(e.target.value)
	}

	componentDidUpdate(prevProps, prevState) {
		if(this.props.isFocus){
			this.refs.label.focus()
		}
	}


	render() {
		return (
			<div className={styles.main}>
				<input
					onKeyPress={this.props.keyPressed}
					className={styles.label}
					ref="label"
					value={ this.props.label }
					type="text"
					onChange={this.changed.bind(this)}/>
			</div>
		);
	}
}

Label.propTypes = {
	label: React.PropTypes.string.isRequired,
	labelChanged: React.PropTypes.func.isRequired
}

export default Label


 // onChange={this.changeLabel.bind(this)}