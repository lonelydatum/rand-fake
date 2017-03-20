import React from 'react';
import { inject, observer } from "mobx-react"
import styles from './Giffy.css'
import CloseViz from './CloseViz.js'
import _ from 'lodash'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


@inject('store') @observer
class Giffy extends React.Component {

  constructor(p){
    super(p)

    this.excitedList = [
      {url:'https://media.giphy.com/media/l0IybQ6l8nfKjxQv6/giphy.gif', label:'squirel'},
      {url:'https://media.giphy.com/media/3o7abKGM3Xa70I7jCU/giphy.gif', label:'captain_obvious'},
      {url:'https://media.giphy.com/media/11sBLVxNs7v6WA/giphy.gif', label:'minions'},
      {url:'https://media.giphy.com/media/10UeedrT5MIfPG/giphy.gif', label:'tom_jerry'},
      {url:'https://media.giphy.com/media/5oGIdt1xapQ76/giphy.gif', label:'elaine'},
      {url:'https://media.giphy.com/media/l3E6qj3wFoUiXbxuw/giphy.gif', label:'dancing_headphones'},
      {url:'https://media.giphy.com/media/y8Mz1yj13s3kI/giphy.gif', label:'oprah'},
      {url:'http://media.giphy.com/media/2n8480RCQ2jBe/giphy.gif', label:'jimmy_falon'},
      {url:'https://media.giphy.com/media/6dSwtLb9q1UuA/giphy.gif', label:'obama'},

      {url:'https://media.giphy.com/media/LbLySqo73Z2Y8/giphy.gif', label:'pug'},
      {url:'./images/eliot_happy.gif', label:'eliot'},
      {url:'https://media.giphy.com/media/bU3fK8ZpMYEFO/giphy.gif', label:'tom_cruise'},
      {url:'https://media.giphy.com/media/qmEboC2VVjBgQ/giphy.gif', label:'tiger'}
    ]
  }

  	getUrl() {
      const randomItem = _.random(this.excitedList.length-1)
      // return './images/eliot_happy.gif'
  		return this.excitedList[randomItem].url
  	}



  	render() {
  		const css = {backgroundImage:`url(${this.getUrl()})`}
  		const {latestResult} = this.props.store

		return (
	  		<div className={styles.main} style={css}>

	  				<CloseViz/>
            <h1 className={styles.meme}>{latestResult.label}</h1>
	  		</div>
		);
  	}

}



// Giffy.propTypes = {

// };


export default Giffy;

