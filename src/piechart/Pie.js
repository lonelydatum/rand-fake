



import React, { Component } from 'react';
import { inject, observer } from "mobx-react"
import PieD3 from './PieD3.js'




@inject('store') @observer
class Pie extends Component {

	createPie(data) {

		this.pieD3.create(data)

	}

	componentDidUpdate(prevProps, prevState) {
		// console.log(this);

	}

	componentDidMount() {

		this.pieD3 = new PieD3(this.refs.pie)

		this.createPie(this.props.store.listBrute)


	}

	render() {
		if(this.props.store.listBrute && this.refs.pie){
			this.createPie(this.props.store.listBrute)
		}
		return (
			<div>
				<svg width="960" height="500">
					<g ref="pie" transform="translate(480,250)">

					</g>
				</svg>
			</div>
		);
	}
}

export default Pie