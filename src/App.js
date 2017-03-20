import React, { PropTypes } from 'react';
import { inject, observer } from "mobx-react"

import styles from './App.css'
import PageMeat from './PageMeat.js'
import PageAbout from './about/PageAbout.js'
import Menu from './menu/Menu.js'


@inject('store') @observer
class App extends React.Component {


	createPageAbout() {
		return <PageAbout/>
	}

	createPageMeat() {
		return <PageMeat />
	}




  	render() {
  		const page = this.props.store.viz ? this.createPageMeat() : this.createPageAbout()

		return (
        <div className={styles.main}>
            {page}
            <Menu/>
        </div>
		);
  	}
}


App.propTypes = {
  store: PropTypes.object
};


export default App;
