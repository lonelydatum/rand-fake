import React from 'react'
import ReactDOM from "react-dom"
import AppProvider from './AppProvider.js'
import './index.css'

// const list = localStorage.getItem("list")

var WebFont = require('webfontloader');

  WebFont.load({
    google: {
      families: ['Dosis', 'Bowlby One', 'Roboto Condensed']
    },
    active: startApp
  });



function startApp() {
	const app = document.getElementById('root');
	ReactDOM.render(<AppProvider />, app)
}


// startApp()