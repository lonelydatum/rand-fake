import React from 'react';
import {observer, inject} from 'mobx-react'
import styles from './Menu.css'
import VizMapper from '../viz/VizMapper.js'
import Escape from '../common/Escape.js'

@inject('store') @observer
class Menu extends React.Component {

    constructor(p) {
      super(p)
      this.MENU_ABOUT = 0
      this.MENU_NORMAL_EXPAND = 1
      this.MENU_NORMAL_COLLAPSE = 2

      this.state = {type: this.getState()}
      this.escape = new Escape(this.onEscape.bind(this))
    }

    onEscape() {
      this.setState({type: this.MENU_NORMAL_COLLAPSE})
    }

    getState() {
      if(this.props.store.viz){
        return this.MENU_NORMAL_COLLAPSE
      }else{
        return this.MENU_ABOUT
      }
    }

    doExpand() {
      this.escape.on()
      this.setState({type: this.MENU_NORMAL_EXPAND})
    }

  	doCollapse(itemID) {
      this.setState({type: this.MENU_NORMAL_COLLAPSE})
      this.props.store.viz = itemID
  	}

  	createMenuList() {
      // console.log(this.props.store.viz);
  		return VizMapper.list.map((item, index)=>{
        item.index = index
        const isSelected = this.props.store.viz===item.id
        const css = isSelected ? styles.menuItemSelected : styles.menuItem
        const onClick = isSelected ? this.doCollapse.bind(this, item.id) : this.doCollapse.bind(this, item.id)
  			return (
  				<li key={index} className={css} onClick={onClick}>
  					{item.label}
  				</li>)
  		})
  	}

  	render() {

      let cssMain;
      let cssExpand;
      let cssExpandCover;
      let cssCollapse;


      let cssMainXY
      let x, y

      switch(this.state.type) {
          case this.MENU_ABOUT:
            cssMain = styles.mainAbout
            cssExpand = styles.expandShow
            cssCollapse = styles.collapseHide
            cssExpandCover = styles.expandCoverHide
            x = (window.innerWidth - 300) / 2
            y = 150
            cssMainXY = {transform: `translate(${x}px, ${y}px)`}
            break
          case this.MENU_NORMAL_EXPAND:

            cssExpand = styles.expandShow
            cssExpandCover = styles.expandCoverHide
            cssCollapse = styles.collapseHide
            cssMain = styles.mainNormalExpand

            x = window.innerWidth - 310
            console.log(x);
            y = 10
            cssMainXY = {transform: `translate(${x}px, ${y}px)`}
            // cssMain = this.props.store.showResults ? styles.mainHide : styles.mainNormal

            break
          case this.MENU_NORMAL_COLLAPSE:
            // cssMain = this.props.store.showResults ? styles.mainHide : styles.mainNormal
            x = window.innerWidth - 310
            y = 10
            cssMainXY = {transform: `translate(${x}px, ${y}px)`}
            cssExpandCover = styles.expandCoverShow
            cssExpand = styles.expandHide
            cssCollapse = styles.collapseShow
            cssMain = styles.mainNormalCollapse
            break
          default:
            cssMain = this.props.store.showResults ? styles.mainHide : styles.mainNormal
            cssExpandCover = styles.expandCoverShow
            cssExpand = styles.expandHide
            cssCollapse = styles.collapseShow
            break
      }

      // const cssExpand = (this.state.type===this.MENU_NORMAL_EXPAND) ? styles.expandShow : styles.expandHide
      // const cssCollapse = (this.state.type===this.MENU_NORMAL_EXPAND) ? styles.collapseHide : styles.collapseShow
      // console.log(cssMain);



		return (
	  		<div className={cssMain} style={cssMainXY}>
	  			<div className={cssExpand}>
	  				<ul className={styles.expandList}>
              {this.createMenuList()}
            </ul>
            <div className={cssExpandCover}></div>
	  			</div>
          <div className={cssCollapse} onClick={this.doExpand.bind(this)}>
            <i className="fa fa-bars" aria-hidden="true"></i>
          </div>
	  		</div>
		);
  	}

}




export default Menu;

