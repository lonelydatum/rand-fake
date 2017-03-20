import React from 'react';
import {observer, inject} from 'mobx-react'
import styles from './Menu.css'
import VizMapper from '../viz/VizMapper.js'

@inject('store') @observer
class Menu extends React.Component {

  	didClick(item) {

      this.props.store.viz = item.id

  	}

  	createMenuList() {
  		return VizMapper.list.map((item, index)=>{
        item.index = index
  			return (
  				<li key={index} onClick={this.didClick.bind(this, item)}>
  					{item.label}
  				</li>)
  		})
  	}

  	render() {
		return (
	  		<div className={styles.main}>
	  			<ul>
	  				{this.createMenuList()}
	  			</ul>
	  		</div>
		);
  	}

}




export default Menu;

