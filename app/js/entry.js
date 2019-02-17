'use strict'


require('./../../node_modules/bootstrap/dist/css/bootstrap.min.css')
require('./../../node_modules/bootstrap/dist/js/bootstrap.js')
const util = require('./util.js')
const competitions = require('./competitions')
const teamsFromLeague = require('./teamsFromLeague')
const home = require('./home')
const groups = require('./groups')
const matches = require('./matches')
const login = require('./login')
const mainView = require('./../views/main.html')
const Handlebars = require('./../../node_modules/handlebars/dist/handlebars.js')
const navView = Handlebars.compile(require('./../views/navbar.hbs'))

/**
 * Add mainView and get placeholders references: divMain and divNavbar
 */
document.body.innerHTML = mainView
const divMain = document.getElementById('divMain')
const divNavbar = document.getElementById('divNavbar')

/**
 * Gets the authentication session and insert the navbar.
 */
 
getAuthAndInsertNavbar()

window.onhashchange = showView
window.onload = showView

function showView(){
    const path = window.location.hash
    switch(path){
		case '#home': // home page
			home(divMain)
			break
        case '#competitions': // will list competitions
            competitions(divMain)
            break
        case '#teamsFromLeague': // will have all teams from det. league
            teamsFromLeague(divMain)
            break
        case '#groups': // will have list,add,remove, gamesbetween
            groups(divMain)
            break
        case '#matches': // will have list,add,remove, gamesbetween
            matches(divMain)
            break	
        case '#login': // will have list,add,remove, gamesbetween
            login(divMain, getAuthAndInsertNavbar)
            break				
        default:
            divMain.innerHTML = 'Resource not found!'
    }
    updateNav(path)
}

/**
 * Updates the navigation bar with the active menu option.
 * @param {String} path 
 */
function updateNav(path){
    // Deactivate previous anchor
    const prev = document.querySelector('a.active')
    if(prev) prev.classList.remove('active')

    // Activate anchor in navigation bar
    const option = document.getElementById('nav' + path)
    if(option) option.classList.add('active')
	let outter = document.getElementById('nav#signout')
	if(outter!=null)
		outter.onclick = logOutHandler;
}

/**
 * Fetches the authentication session from /api/auth and 
 * inserts the navbar with the corresponding state.
 */
function getAuthAndInsertNavbar() {
    util.fetchJSON('/foca/auth/session')
        .catch(err => util.showAlert('fetch /foca/auth/session: ' + JSON.stringify(err)))
        .then(session => divNavbar.innerHTML = navView(session))
}

    async function logOutHandler(ev) {
        ev.preventDefault()
       
        const url = 'http://localhost:3000/foca/auth/logout'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const resp = await fetch(url, options)
         
            try{
                if(resp.status == 200){
                window.location.hash = '#home'
                getAuthAndInsertNavbar()
                } 
                else {
                const body = resp.json()
                util.showAlert(`${resp.status} ${resp.statusText}: ${JSON.stringify(body)}`)
                }    
            } catch(err){
                util.showAlert(JSON.stringify(err))
            }
                    
       
    }
