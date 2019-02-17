'use strict'

const request = require('request')
const rp = require('request-promise')
class FocaDB {
  
    constructor(es){
		this.bundlesRefresh = `http://${es.host}:${es.port}/${es.foca_index}/_refresh`
		this.focaUrl = `http://${es.host}:${es.port}/${es.foca_index}` 
		this.groupsUrl= `http://${es.host}:${es.port}/${es.foca_index}/groups`
    }
    
    static init(es) {
        return new FocaDB(es)
    }
	
    CreateGroup(user_id, name, description, teams) //this new parameter is used for a group copy
    {
        let groupTeam = (teams!=undefined)? goupTeams = teams : []
		const options = {
            'method': 'POST',
            'uri': `${this.groupsUrl}`,
            'json': true,
            'body': {'user_id': user_id,'name': name, 'description':description, 'teams': groupTeam}
        }
       return rp(options)
        .then(
            body => {
              return  {"id" : body._id}
            }
        )
	}
	
    getGroupById(user_id,id){
        const uri = `${this.groupsUrl}/${id}`
        
        return rp({
            'method': 'GET',
            'url' : uri,
            'json' : true
        })
        .then(body => {
			if(user_id != body._source.user_id)
				return Promise.reject()
            let group = {}
			group.user_id = body._source.user_id
			group.id = body._id			
            group.name = body._source.name
            group.description = body._source.description
            group.teams = body._source.teams

            return group
        })
      
	}
    getGroups(user_id) {
       
        //const uri = "http://localhost:9200/foca/groups/_search"
		const query = `user_id:${user_id}`
        const uri = `${this.groupsUrl}/_search?q=${query}`

        return rp({
            'method': 'GET',
            'url' : uri,
            'json' : true
        })
        .then(body => { body = body.hits.hits
            let obj = {'groups':[]}  // passing groups array to be consistent
            body.forEach(g => {
                obj.groups.push({
					'user_id': g._source.user_id,
                    'id':g._id,
                    'name': g._source.name,
                    'description':g._source.description,
                    'teams': g._source.teams
                })
            })
            return obj
        })
        
      
    }
    
    editGroup(user_id, id, name, description)
    {
        return this.getGroupById(user_id,id)
            .then (body =>{
                body.name= name
                body.description= description
                const options = {
                'method': 'PUT',
                'uri': `${this.groupsUrl}/${id}`,
                'json': true,
                'body': body
            }
                return options
            })
            .then(options => {
                return rp (options)
                .then(
                    body => {
                      return  { "id" : body._id}
                    }
                )
             })

    }

    insertGroupTeam(user_id,groupId,team){
		if(team == null) return
        return this.getGroupById(user_id,groupId)
        .then(body => {
            body.teams.push(team)
            const options = {
                'method': 'PUT',
                'uri': `${this.groupsUrl}/${groupId}`,
                'json': true,
                'body': body
            }
            return options
        })
        .then(options=> {
            return rp(options)
            .then(
                body => {
                  return  { "id" : body._id}
                }
            )
        })
        
    
    }

    deleteGroupTeam(user_id,groupId,teamId){
        return this.getGroupById(user_id,groupId)
            .then(body =>{
                body.teams = body.teams.filter(t=> t.id != teamId)
			const options = {
                'method': 'PUT',
				'uri': `${this.groupsUrl}/${groupId}`,
				'json': true,
				'body': body
            }
            return options
        })
        .then(options => {
            return rp(options)
            .then(
                body => {
                  return  { "id" : body._id}
                }
            )
        })
    }
}
	

module.exports = FocaDB