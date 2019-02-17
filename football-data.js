'use strict'

const request = require('request')
const rp = require('request-promise')
class FootballData {
  
    constructor(es){
       this.footballDataAPI = `${es.football_api}`
        this.token= es.Api_token
        
    }
    
    static init(es) {
        return new FootballData(es)
    }
    getCompetitions(){
        const options = {
            'method': 'GET',
            'url' : `${this.footballDataAPI}/competitions`,
            'json' : true,
            headers: {

                'X-Auth-Token' :this.token

            }
        }
       return rp(options)
        .then(body => {
            let comps = {} 
            comps.count = body.count
            comps.competitions= []
            body.competitions.forEach(c => {
                comps.competitions.push({
                    'id':c.id,
                    'name': c.area.name,
                    'description':c.name,
                })
            })
           return comps
        })
    }
    getTeamsByCompetitionId(id,cb){
        const options = {
            'method': 'GET',
            'url' : `${this.footballDataAPI}/competitions/${id}/teams`,
            'json' : true,
            headers: {

                'X-Auth-Token' :this.token

            }
        }

       return rp(options)
        .then(body => { let ts = {}
            ts.count = body.count
            ts.teams= []
            body.teams.forEach(t => {
                ts.teams.push({
                    'id':t.id,
                    'name': t.name,
                    'founded':t.founded
                })
            })
            return ts
        })

        .catch(error => error.code=error)

    }

    getgamesfromteam(teamid,dateFrom,dateTo){
      
        //http://api.football-data.org/v2/competitions/2000/teams
        //http://api.football-data.org/v2/teams/teamid/matches?dateFrom=2018-06-25&dateTo=2019-06-02
        
        const options = {
            'method': 'GET',
            'url' : `${this.footballDataAPI}/teams/${teamid}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`,
            'json' : true,
            headers: {

                'X-Auth-Token' :this.token

            }
        }
        return rp(options)
            .then(body => {
                let matches = []
                body.matches.forEach(m => {
                    matches.push({
                        'id':m.id,
                        'competition': m.competition.name,
                        'homeTeam':m.homeTeam.name,
                        'awayTeam':m.awayTeam.name,
                        'date':m.utcDate,
                        'status':m.status
                    })
                })

                
                return matches
            })
            .catch()
    }
    
  
   
}
	
module.exports = FootballData