import React, { Component } from 'react';
import { inject, observer } from "mobx-react"


import Label from '../common/Label.js'

@inject('store') @observer
class LabelItem extends Component {

	didBlur() {
		// console.log(this);
	}

	render() {
		return (
			<Label
				didBlur={this.didBlur.bind(this)}
				isFocus={this.props.store.editId === this.props.id}
				label={this.props.label}
				labelChanged={this.props.labelChanged}
			/>
		);
	}
}


export default LabelItem