import React, { Component } from 'react';

import styles from './PageAbout.css'

// import RandomizeButton from '../common/RandomizeButton.js'

export default class PageAbout extends Component {

	render() {
		return (
			<div className={styles.main}>
				<section>
					<h1>You are an important person who makes BIG decisions at the shop and at home. Relax and let Randomiz.me handle your next descision.</h1>


				</section>

			</div>
		);
	}
}

// <RandomizeButton didClick={this.didClick.bind(this)}>START</RandomizeButton>