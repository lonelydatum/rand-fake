import React, { Component } from 'react';

import styles from './PageAbout.css'

// import RandomizeButton from '../common/RandomizeButton.js'

export default class PageAbout extends Component {

	render() {
		return (
			<div className={styles.main}>
				<section>
					<h1>Do you suck at making decisions? </h1>
					<h1>And then get blamed for it?</h1>
					<h1>Use Randomize to make easy, mundane, trivial decisions and blame it on us if things go wrong.</h1>

				</section>
				<div>
					<p>
						There are a bunch fun ways to randomize your options.
					</p>

				</div>
			</div>
		);
	}
}
// <RandomizeButton didClick={this.didClick.bind(this)}>START</RandomizeButton>