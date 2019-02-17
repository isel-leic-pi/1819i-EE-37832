'use strict'

//const util = require('./app/js/util')
const url = require('url')
const Foca = require('./foca-services') 
//const Foca = require('./lib/foca-mock')

const es = {
    host: 'localhost',
    port: '9200',
    foca_index: 'foca',
    football_api:'http://api.football-data.org/v2/',
    Api_token: '8bd8bc20012b426996fe49aaad58f7ef' // might create another object or delete this
}

const foca = Foca.init(es)

module.exports = (app) => {
	app.get('/competitions',getCompetitions)
	app.get('/competitions/:id/teams',getTeamsByCompetitionId)
	app.use(checkAuthentication)
    app.get('/foca/groups',getGroups)
    app.post('/foca/groups',insertGroup) 
	app.get('/foca/groups/:id',getGroupById)
	app.put('/foca/groups/:id',updateGroup)
	app.post('/foca/copy/groups/:id', copyGroup) /** Possibilidade de criar uma cópia de um grupo existente, incluindo todas as equipas que fazem parte desse grupo. */
    app.post('/foca/groups/:groupId/competition/:compId/team/:teamId',insertTeamInGroup)
    app.delete('/foca/groups/:groupId/team/:teamId',removeTeamInGroup)
    app.get('/foca/groups/:groupId/matches',getAllGamesBetweenTwoDates)
	app.use(resourceNotFond)
	app.use(errorHandler)
	
	function checkAuthentication(req, resp, next) {
        if(req.isAuthenticated())
			next()
        else{
			//util.showAlert('Não tem acesso a estes recursos')
			next({
				'statusCode': 401,
				'err': 'Cannot access foca by unauthenticated users!'
			})
		} 
    }
	function getCompetitions(req, resp,next) {

		foca
			.getCompetitions()
			.then((body) =>{ 
				resp.statusCode = 200
				resp.end(JSON.stringify(body))})
			.catch(next)
	}


	function getGroups(req, resp,next) {
		foca
			.getGroups(req.user._id)
			.then((body) =>{ 
				resp.statusCode = 200
				resp.end(JSON.stringify(body))})
			.catch(next)	
	}

	function getGroupById(req, resp,next) {
		let id = req.params.id
		foca 
			.getGroupById(req.user._id,id)
			.then((body) =>{ 
				resp.statusCode = 200
				resp.end(JSON.stringify(body))})
			.catch(next)
	}

	function getTeamsByCompetitionId(req, resp,next) {
		let id = req.params.id
		foca
		.getTeamsByCompetitionId(id)
		.then((body) => { 
			resp.statusCode = 200
			resp.end(JSON.stringify(body))})
		.catch(next)
	}

	function insertGroup(req, resp,next) {
		let name = req.query.name
		let description = req.query.description
		foca
		.createGroup(req.user._id,name, description)
		.then((body) => { 
			resp.statusCode = 200
			resp.end(JSON.stringify(body))})
		.catch(next)
	}


	function updateGroup(req, resp, next) {
		let id = req.params.id
		let name = req.query.name
		let description = req.query.description
		foca
			.editGroup(req.user._id,id, name, description)
			.then((body) => { 
				resp.statusCode = 200
				resp.end(JSON.stringify(body))})
			.catch(next)
		
	}
	
	function copyGroup(req, resp, next) {
		let id = req.params.id
		foca
			.copyGroup(req.user._id,id)
			.then((body) => { 
				resp.statusCode = 200
				resp.end(JSON.stringify(body))})
			.catch(next)
		
	}

	function insertTeamInGroup(req, resp,next) {
		let groupId = req.params.groupId
		let compId = req.params.compId
		let teamId = req.params.teamId

		foca 
			.insertTeamInGroup(req.user._id,groupId, compId, teamId)
			.then((body) => { 
				resp.statusCode = 200
				resp.end(JSON.stringify(body))})
			.catch(next)

	}

	function removeTeamInGroup(req, resp,next) {
		let groupId = req.params.groupId
		let teamId = req.params.teamId

		foca
		.deleteGroupTeam(req.user._id,groupId, teamId)
		.then((body) =>{ 
			resp.statusCode = 200
			resp.end(JSON.stringify(body))})
		.catch(next)

	}

	function getAllGamesBetweenTwoDates(req, resp, next) {
		let groupId = req.params.groupId
		let dateFrom = req.query.dateFrom
		let dateTo = req.query.dateTo
		
		foca
			.getAllGamesBetweenTwoDates(req.user._id,groupId,dateFrom,dateTo)
			.then((body) =>{ 
				resp.statusCode = 200
				resp.end(JSON.stringify(body))})
			.catch(next)

	}
	function resourceNotFond(req, resp,next) {
		/*
		resp.statusCode = 404
		resp.end('Resource Not Found!')
		return true
		*/
		next({
            'statusCode': 404,
            'error': 'Resource Not Found!'
        })
	}
	function errorHandler(err, req, res, next) {
        res.statusCode = err.statusCode || 500
        const error = err instanceof Error
            ? { 'message': err.message, 'stack': err.stack}
            : err
        res.json(error)
    }
}

