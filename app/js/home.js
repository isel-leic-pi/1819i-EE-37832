'use strict'

const util = require('./util.js') //in case its needed
const Handlebars = require('./../../node_modules/handlebars/dist/handlebars.js') //in case its needed
const homeHBS = require('./../views/home.hbs') //in case its needed
const homeHTML = require('./../views/home.html')

module.exports = (divMain) => {
    divMain.innerHTML = homeHTML
}