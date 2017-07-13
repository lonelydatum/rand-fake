import React from 'react'
import {inject, observer} from 'mobx-react'
import styles from './PageMeat.css'

import AddItem from './addItem/AddItem.js'
import List from './list/List.js'

import VizMain from './viz/VizMain.js'
import {autorun} from 'mobx'
import RandomizeButton from './common/RandomizeButton.js'


@inject('store') @observer
class PageMeat extends React.Component {


    componentDidMount() {
      autorun(()=>{
        /* eslint-disable */
        this.props.store.list.length
        /* eslint-enable */
        this.refs.randomizeButton.tween()
      })
    }

  	onNext() {
    	this.props.store.vizOpen = true
  	}

  	onRandomize(result) {
    	this.props.store.randomize()
  	}




  	render() {

    const {isEmpty} = this.props.store



		return (
	  		<div className={styles.main}>
	  			 <div className={styles.rawData}>
	                <AddItem />
	                <List />
	                <div className={styles.buttonRandomize} >
                    <RandomizeButton ref="randomizeButton" disable={isEmpty} didClick={this.onRandomize.bind(this)}>
                      RANDOMIZE
                    </RandomizeButton>
                  </div>

	                <div className={styles.buttonNext}>
                    <RandomizeButton didClick={this.onNext.bind(this)}>
                      NEXT
                    </RandomizeButton>
                  </div>
	            </div>
	            <VizMain/>
	  		</div>
		);
  	}

}





export default PageMeat;

