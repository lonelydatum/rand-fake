import React, { Component } from 'react';

import Percent from './Percent.js'
import styles from './LabelPercent.css'

class LabelPercent extends Component {

	render() {
		return (
			<div className={styles.main}>
				{this.props.children}

				<Percent
					percent={this.props.percent}
					percentChanged={this.props.percentChanged.bind(this)}/>
			</div>
		);
	}
}

LabelPercent.propTypes = {
	// label: React.PropTypes.string.isRequired,
	// labelChanged: React.PropTypes.func.isRequired,
	percent: React.PropTypes.number.isRequired,
	percentChanged: React.PropTypes.func.isRequired
}

export default LabelPercent

