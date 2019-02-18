'use strict'

const FocaDB = require('./foca-db.js')
const FootballData = require('./football-data')
const rp = require('request-promise')

class Foca {
    constructor(es) {
        this.focadb = FocaDB.init(es)
        this.footballData = FootballData.init(es)
    }
    static init(es) {
        return new Foca(es)
    }
    getCompetitions() {

        return this
            .footballData
            .getCompetitions()
            .catch(err => Promise.reject({code: 404}))

        }
    getTeamsByCompetitionId(id) {
        return this
            .footballData
            .getTeamsByCompetitionId(id)
            .catch(err => Promise.reject({code: 404}))
        }
    getGroups(user_id) {

        return this
            .focadb
            .getGroups(user_id)
    }

    /**(1)
	 * Não podem existir grupos com o mesmo nome, pertencente a um utilizador, 
	 * mas podem existir grupos com o mesmo nome pertencentes a utilizadores diferentes.
	 * Nesta implementação cada user apenás vê e edita os seus grupos.
	 * @param {*} user_id
	 * @param {*} name
	 * @param {*} description
	 */
     createGroup(user_id, name, description) {
        //verify if group already exist, should return error 409
		
		return this.focadb.getGroups(user_id)
		.then( body=> {
			let found =false
			body.groups.forEach(group => {
				if (group.name == name) {
					found=true
				}
			})

			return (!found)? this
            .focadb.CreateGroup(user_id, name, description)
			.catch(err => Promise.reject({statusCode: 404}))
			: Promise.reject({statusCode:409})

		})
		
        // if it doesn't find a group with the name passed as a parameter then returns
        // the created group
        /*return this
            .focadb.CreateGroup(user_id, name, description)
            .catch(err => Promise.reject({code: 404}))*/
        }
    getGroupById(user_id, id) {
        return this
            .focadb
            .getGroupById(user_id, id)
            .catch(err => Promise.reject({code: 404, err: err}))
		}
		
    editGroup(user_id, id, name, description) {
		return this.focadb.getGroups(user_id)
		.then( body=> {
			let found =false
			body.groups.forEach(group => {
				if (group.name == name) {
					found=true
				}
			})

			return (!found)? 
			this.focadb.editGroup(user_id, id, name, description)
			.catch(err => Promise.reject({code: 404}))
			:Promise.reject({statusCode:409})
			
		})
	}

    /** (2)
	 * Um grupo não pode ter a mesma equipa mais que uma vez.
	 *
	 * @param {*} user_id
	 * @param {*} groupId
	 * @param {*} competitionId
	 * @param {*} teamId
	 */
	insertTeamInGroup(user_id,groupId, competitionId, teamId){

		return this.focadb.getGroupById(user_id, groupId)
				.then(group => { 
					
					let sameteam = false
					group.teams.forEach(team =>
						{
							if( team.id == teamId){
								sameteam = true
							}
						}
					)
					return (!sameteam)
						? this.footballData.getTeamsByCompetitionId(competitionId)
							.then(body =>{
								let team = checkid (body.teams, teamId)
								return this.focadb.insertGroupTeam(user_id,groupId, team)
							})
							.catch(err=>
								Promise.reject({code:404}
							))
						: Promise.reject({statusCode: 409}) //TODO show this error msg and dont call getGroupByID
				})

	}  
		

    deleteGroupTeam(user_id, groupId, teamId) {
        return this
            .focadb
            .deleteGroupTeam(user_id, groupId, teamId)
            .catch(err => Promise.reject({code: 404}))

        }

    /**(3)
	 * * Possibilidade de criar uma cópia de um grupo existente, incluindo todas as equipas que fazem parte desse grupo.
	 */
	 copyGroup(user_id, groupID){
		return this.focadb.getGroupById(user_id, groupID)
					.then(group => {
						return this.focadb.CreateGroup(user_id, group.name + '(copia)', group.description, group.teams) 
					})
		

	}

    getAllGamesBetweenTwoDates(user_id, groupId, dateFrom, dateTo) {

        return this
            .focadb
            .getGroupById(user_id, groupId)
            .then(
                body => Promise.all(body.teams.map(team => this.footballData.getgamesfromteam(team.id, dateFrom, dateTo)))
            )
            .then(
                matches => matches.reduce((accumulator, currentvalue) => accumulator.concat(currentvalue)).sort((matchesX, matchesY) => (new Date(matchesX.date) - new Date(matchesY.date)))
            )
            .catch(err => Promise.reject({code: 404}))

        }

}

function checkid(source, teamid) {

    let teamA
    source.forEach(team => {
        if (team.id == teamid) {
            teamA = team
        }
    })
    return teamA

}

module.exports = Foca