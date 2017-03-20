import React, { PropTypes } from 'react';
import styles from './SpeechBubble.css'



class SpeechBubble extends React.Component {
  	render() {
		return (
	  		<div className={styles.main}>{this.props.children}</div>
		);
  	}
}



SpeechBubble.propTypes = {
	children: PropTypes.node.isRequired
};


export default SpeechBubble;

