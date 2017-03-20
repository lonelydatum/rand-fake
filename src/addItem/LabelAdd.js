import React, { Component } from 'react';

import Label from '../common/Label.js'


class LabelAdd extends Component {

	keyPressed(e) {
		if (e.which === 13) {
			this.props.add()
    	}
	}


	render() {
		return (
			<Label
				autoFocus={true}
				invalid={this.props.invalid}
				didFocus={this.props.didFocus}
				didBlur={this.props.didBlur}
				keyPressed={this.keyPressed.bind(this)}
				label={this.props.label}
				labelChanged={this.props.labelChanged}
			/>
		);
	}
}


export default LabelAdd