'use strict'
const request = require( 'request-promise')
const https = require('https')

class Foca {
    static init() {
        return new Foca()
    }

    /**
	 * Insert a group on foca-db.js
	 * @param {* group name} name
	 * @param {* group descritpion} description
	 * @param {* callback functio} cb
	 * URL -> POST http://localhost:3000/foca/groups?name={name}&description={discription}
	 */
    createGroup(name, description) {
	    let id // = 123; // cria o endereço 123 para testes, e testes posteriores adiciona um indice gerado ao calhas
	
        do{
            id = Math.floor(Math.random() * 99999999);
        }while(foca.groups[id]);
    
        foca
            .groups.push({'id':id,'name': name, 'description': description, 'teams': []})
      return Promise.resolve({'id': id})
    }
	
	getGroupById(id){
        var xx;
        foca.groups.forEach(x=> {
            if(x.id == id){
                console.log(x)
                xx = x
            }
        })
        return Promise.resolve(xx)
	}

    /**
	 *  Edit a specific group (name and description) on foda-db.js
	 * @param {* group id} id
	 * @param {* group name} name
	 * @param {* group description} description
	 * @param {* callback funtion} cb
	 * URL -> PUT http://localhost:3000/foca/groups/{group_id}?name={name}&description={discription}
	 */
    editGroup(id, name, description) {
       // console.log('METODO editGroup FOI CHAMADO')
       var xx
       foca.groups.forEach(x=> {
           if(x.id == id){
                x.name = name
                x.description= description
                xx=x
           }
       }) 
     return  Promise.resolve(xx)
    }

    /**
	 * Insert team on a group
	 * @param {* Id of a specific competition } competitionId
	 * @param {* Id of a specific competion group} groupdId
	 * @param {* Id of team that i want to insert} team
	 * @param {* callback Function} cb
	 * @param {* group where the team will inserted } groupName
	 * URL -> POST  http://localhost:3000/foca/groups/{group_id}/Teams/{Team_id}?name={groupName}
	 */
    insertGroupTeam(groupId, competitionId, teamId, cb) {
        // 1º Get a competition 2º Get a team from a specific competetion 3º Insert this
        // team to a specific group on FOCA
        //console.log('METODO  insertGroupTeam FOI CHAMADO')
	
        //gettin a team from a competition
        competitionTeams.competitions.forEach(comp => {
            if (comp.competition.id == competitionId) {
                comp
                    .teams
                    .forEach(team => {
                       
                        
                        if (team.id == teamId) {
							foca
							.groups
							.forEach(group => {
								if (group.id == groupId) {
									/*
									let i = 0;
									let alreadyIn = false;
									for(i;group.teams && i<group.teams.length;i++){
										if(group.teams[i].id == team.id){
											alreadyIn = true;
										}
									}
									if(!alreadyIn){
										group
											.teams
											.push(JSON.stringify(team))
									}
									*/
									group
										.teams
										.push(team)
								}
							})
                        }
                    })
            }
        })
        cb(null, foca); // to show the inserted team
    }

    /**
	 * Delete one team fo a specific group
	 * @param {* Name of the group wich got the team to remove} groupName
	 * @param {* Id of the team that i want remove} teamId
	 * @param {* callback Function} cb
	 * URL -> DELETE http://localhost:3000/foca/groups/{group_id}/Team/{Team_id}?name={groupName}
	 */
    deleteGroupTeam(groupId, teamId, cb) {
        // 1º Get a competition 2º Get a team from a specific competetion 3º delete this
        // team to a specific group on FOCA
        //console.log('METODO  deleteGroupTeam FOI CHAMADO')
        
        foca
            .groups
            .forEach(group => {
				if (group.id == groupId) { //lookin for a group
                    group.teams = group
                        .teams
                        .filter(team =>{
							team.id != teamId
						} ) //removing the unwanted team
                }
        })
        return Promise.resolve(foca)
    }

    /**
	 * Show all groups from foca-db.js
	 * @param {* callback funtion} cb
	 * URL -> GET http://localhost:3000/foca/groups
	 */
    getGroups(cb) {
        return (!foca.groups)
         ? Promise.reject({statusCode: 404})
         : Promise.resolve(foca)
    }

	/**
	 * show all competitions from football-data.js
	 * @param {* callback function} cb 
	 * GET http://localhost:3000/competitions
	 */
    getCompetitions() {
        return !competitions
        ? Promise.reject({statusCode: 404}) 
        : Promise.resolve(competitions)
    }

	/**
	 * show all teams from a specific competition  using football-data.js
	 * @param {* competition id} id 
	 * @param {* callback function} cb 
	 * GET http://localhost:3000/competion/{teamId}/teams
	 */
    getTeamsByCompetitionId(id) {
    return new Promise((resolve, reject)=> {
       let hasId = false
       let comp  = competitions.competitions
       
       comp.forEach( c => {
           if(c.id == id){
               hasId = true
           }
       })
           
     if(hasId){
            resolve(competitionTeams)
        }else{
            reject({statusCode: 404})
        }
    })

    }

}
// ------------------CREATE GROUP SECTION
// --------------------------------------------//
const foca = {
    'groups': []
}
//proly wont use it
const teams = {}

// -> Should be on a different module
// ------------------GET COMPETITIONS SECTION  
// --------------------------------------------//
const competitions = {
    "count": 147,
    "competitions": [
        {
            "id": 2006,
            "name": "Africa",
            "description": "WC Qualification"
        },
        {
            "id": 2025,
            "name": "Argentina",
            "description": "Supercopa Argentina"
        },
        {
            "id": 2023,
            "name": "Argentina",
            "description": "Primera B Nacional"
        },
        {
            "id": 2024,
            "name": "Argentina",
            "description": "Superliga Argentina"
        },
        {
            "id": 2008,
            "name": "Australia",
            "description": "A League"
        },
        {
            "id": 2026,
            "name": "Australia",
            "description": "FFA Cup"
        },
        {
            "id": 2012,
            "name": "Austria",
            "description": "Bundesliga"
        },
        {
            "id": 2022,
            "name": "Austria",
            "description": "Playoffs 1/2"
        },
        {
            "id": 2027,
            "name": "Austria",
            "description": "ÖFB Cup"
        },
        {
            "id": 2020,
            "name": "Austria",
            "description": "Erste Liga"
        },
        {
            "id": 2009,
            "name": "Belgium",
            "description": "Jupiler Pro League"
        },
        {
            "id": 2028,
            "name": "Belgium",
            "description": "Coupe de Belgique"
        },
        {
            "id": 2032,
            "name": "Belgium",
            "description": "Playoffs II"
        },
        {
            "id": 2010,
            "name": "Belgium",
            "description": "Supercoupe de Belgique"
        },
        {
            "id": 2033,
            "name": "Belgium",
            "description": "Division 1B"
        },
        {
            "id": 2034,
            "name": "Bolivia",
            "description": "LFPB"
        },
        {
            "id": 2035,
            "name": "Bosnia and Herzegovina",
            "description": "Premier Liga"
        },
        {
            "id": 2013,
            "name": "Brazil",
            "description": "Série A"
        },
        {
            "id": 2038,
            "name": "Brazil",
            "description": "Série D"
        },
        {
            "id": 2036,
            "name": "Brazil",
            "description": "Série C"
        },
        {
            "id": 2029,
            "name": "Brazil",
            "description": "Série B"
        },
        {
            "id": 2037,
            "name": "Brazil",
            "description": "Copa do Brasil"
        },
        {
            "id": 2039,
            "name": "Bulgaria",
            "description": "Kupa na Bulgarija"
        },
        {
            "id": 2040,
            "name": "Bulgaria",
            "description": "A PFG"
        },
        {
            "id": 2041,
            "name": "Canada",
            "description": "Canadian Championship"
        },
        {
            "id": 2043,
            "name": "Chile",
            "description": "Supercopa de Chile"
        },
        {
            "id": 2048,
            "name": "Chile",
            "description": "Primera División"
        },
        {
            "id": 2042,
            "name": "Chile",
            "description": "Playoffs 1/2"
        },
        {
            "id": 2044,
            "name": "China PR",
            "description": "Chinese Super League"
        },
        {
            "id": 2045,
            "name": "Colombia",
            "description": "Liga Postobón"
        },
        {
            "id": 2046,
            "name": "Colombia",
            "description": "Superliga de Colombia"
        },
        {
            "id": 2047,
            "name": "Croatia",
            "description": "Prva Liga"
        },
        {
            "id": 2049,
            "name": "Czech Republic",
            "description": "Synot Liga"
        },
        {
            "id": 2051,
            "name": "Denmark",
            "description": "DBU Pokalen"
        },
        {
            "id": 2050,
            "name": "Denmark",
            "description": "Superliga"
        },
        {
            "id": 2141,
            "name": "Denmark",
            "description": "Play Offs 1/2"
        },
        {
            "id": 2052,
            "name": "Ecuador",
            "description": "Copa Pilsener Serie A"
        },
        {
            "id": 2021,
            "name": "England",
            "description": "Premier League"
        },
        {
            "id": 2056,
            "name": "England",
            "description": "FA Community Shield"
        },
        {
            "id": 2030,
            "name": "England",
            "description": "League One"
        },
        {
            "id": 2139,
            "name": "England",
            "description": "Football League Cup"
        },
        {
            "id": 2053,
            "name": "England",
            "description": "National League"
        },
        {
            "id": 2054,
            "name": "England",
            "description": "League Two"
        },
        {
            "id": 2055,
            "name": "England",
            "description": "FA Cup"
        },
        {
            "id": 2016,
            "name": "England",
            "description": "Championship"
        },
        {
            "id": 2057,
            "name": "Estonia",
            "description": "Meistriliiga"
        },
        {
            "id": 2001,
            "name": "Europe",
            "description": "UEFA Champions League"
        },
        {
            "id": 2018,
            "name": "Europe",
            "description": "European Championship"
        },
        {
            "id": 2058,
            "name": "Europe",
            "description": "UEFA Women's EURO"
        },
        {
            "id": 2007,
            "name": "Europe",
            "description": "WC Qualification"
        },
        {
            "id": 2146,
            "name": "Europe",
            "description": "UEFA Europa League"
        },
        {
            "id": 2031,
            "name": "Finland",
            "description": "Veikkausliiga"
        },
        {
            "id": 2059,
            "name": "Finland",
            "description": "Suomen Cup"
        },
        {
            "id": 2143,
            "name": "France",
            "description": "Playoffs 1/2"
        },
        {
            "id": 2138,
            "name": "France",
            "description": "Coupe de France"
        },
        {
            "id": 2142,
            "name": "France",
            "description": "Ligue 2"
        },
        {
            "id": 2144,
            "name": "France",
            "description": "Playoffs 2/3"
        },
        {
            "id": 2135,
            "name": "France",
            "description": "Coupe de la Ligue"
        },
        {
            "id": 2015,
            "name": "France",
            "description": "Ligue 1"
        },
        {
            "id": 2136,
            "name": "France",
            "description": "Trophée des Champions"
        },
        {
            "id": 2129,
            "name": "Germany",
            "description": "Regionalliga"
        },
        {
            "id": 2134,
            "name": "Germany",
            "description": "DFL Super Cup"
        },
        {
            "id": 2004,
            "name": "Germany",
            "description": "2. Bundesliga"
        },
        {
            "id": 2140,
            "name": "Germany",
            "description": "3. Liga"
        },
        {
            "id": 2002,
            "name": "Germany",
            "description": "Bundesliga"
        },
        {
            "id": 2011,
            "name": "Germany",
            "description": "DFB-Pokal"
        },
        {
            "id": 2133,
            "name": "Germany",
            "description": "Frauen Bundesliga"
        },
        {
            "id": 2131,
            "name": "Greece",
            "description": "Greek Cup"
        },
        {
            "id": 2132,
            "name": "Greece",
            "description": "Super League"
        },
        {
            "id": 2130,
            "name": "Hungary",
            "description": "Magyar Kupa"
        },
        {
            "id": 2128,
            "name": "Hungary",
            "description": "NB I"
        },
        {
            "id": 2127,
            "name": "Iceland",
            "description": "Úrvalsdeild"
        },
        {
            "id": 2126,
            "name": "India",
            "description": "I-League"
        },
        {
            "id": 2125,
            "name": "Israel",
            "description": "Ligat ha'Al"
        },
        {
            "id": 2121,
            "name": "Italy",
            "description": "Serie B"
        },
        {
            "id": 2122,
            "name": "Italy",
            "description": "Coppa Italia"
        },
        {
            "id": 2123,
            "name": "Italy",
            "description": "Serie C"
        },
        {
            "id": 2019,
            "name": "Italy",
            "description": "Serie A"
        },
        {
            "id": 2124,
            "name": "Italy",
            "description": "Supercoppa"
        },
        {
            "id": 2117,
            "name": "Japan",
            "description": "J. League Division 2"
        },
        {
            "id": 2118,
            "name": "Japan",
            "description": "J.League Cup"
        },
        {
            "id": 2119,
            "name": "Japan",
            "description": "J. League"
        },
        {
            "id": 2120,
            "name": "Japan",
            "description": "Super Cup"
        },
        {
            "id": 2116,
            "name": "Latvia",
            "description": "Virslīga"
        },
        {
            "id": 2115,
            "name": "Lithuania",
            "description": "A Lyga"
        },
        {
            "id": 2114,
            "name": "Malta",
            "description": "Premier League"
        },
        {
            "id": 2112,
            "name": "Mexico",
            "description": "SuperCopa MX"
        },
        {
            "id": 2113,
            "name": "Mexico",
            "description": "Liga MX"
        },
        {
            "id": 2111,
            "name": "Mexico",
            "description": "Copa MX"
        },
        {
            "id": 2005,
            "name": "Netherlands",
            "description": "Jupiler League"
        },
        {
            "id": 2109,
            "name": "Netherlands",
            "description": "KNVB Beker"
        },
        {
            "id": 2110,
            "name": "Netherlands",
            "description": "Johan Cruijff Schaal"
        },
        {
            "id": 2003,
            "name": "Netherlands",
            "description": "Eredivisie"
        },
        {
            "id": 2108,
            "name": "Northern Ireland",
            "description": "League Cup"
        },
        {
            "id": 2107,
            "name": "Northern Ireland",
            "description": "Premiership"
        },
        {
            "id": 2104,
            "name": "Norway",
            "description": "Playoffs 1/2"
        },
        {
            "id": 2105,
            "name": "Norway",
            "description": "1. divisjon"
        },
        {
            "id": 2106,
            "name": "Norway",
            "description": "Tippeligaen"
        },
        {
            "id": 2103,
            "name": "Oceania",
            "description": "WC Qualification"
        },
        {
            "id": 2102,
            "name": "Panama",
            "description": "Liga Panameña de Fútbol"
        },
        {
            "id": 2101,
            "name": "Peru",
            "description": "Primera División"
        },
        {
            "id": 2099,
            "name": "Poland",
            "description": "Superpuchar Polski"
        },
        {
            "id": 2100,
            "name": "Poland",
            "description": "Puchar Polski"
        },
        {
            "id": 2017,
            "name": "Portugal",
            "description": "Primeira Liga"
        },
        {
            "id": 2096,
            "name": "Portugal",
            "description": "Liga2 Cabovisão"
        },
        {
            "id": 2097,
            "name": "Portugal",
            "description": "Supertaça Cândido de Oliveira"
        },
        {
            "id": 2098,
            "name": "Portugal",
            "description": "Taça de Portugal"
        },
        {
            "id": 2095,
            "name": "Republic of Ireland",
            "description": "Premier Division"
        },
        {
            "id": 2092,
            "name": "Romania",
            "description": "Liga II"
        },
        {
            "id": 2093,
            "name": "Romania",
            "description": "Supercupa României"
        },
        {
            "id": 2094,
            "name": "Romania",
            "description": "Liga I"
        },
        {
            "id": 2091,
            "name": "Russia",
            "description": "Russian Super Cup"
        },
        {
            "id": 2090,
            "name": "Russia",
            "description": "Playoffs 1/2"
        },
        {
            "id": 2088,
            "name": "Russia",
            "description": "FNL"
        },
        {
            "id": 2137,
            "name": "Russia",
            "description": "RFPL"
        },
        {
            "id": 2089,
            "name": "Russia",
            "description": "Russian Cup"
        },
        {
            "id": 2086,
            "name": "Scotland",
            "description": "Playoffs 2/3"
        },
        {
            "id": 2087,
            "name": "Scotland",
            "description": "Scottish Cup"
        },
        {
            "id": 2084,
            "name": "Scotland",
            "description": "Premier League"
        },
        {
            "id": 2085,
            "name": "Scotland",
            "description": "Championship"
        },
        {
            "id": 2083,
            "name": "South Africa",
            "description": "ABSA Premiership"
        },
        {
            "id": 2082,
            "name": "South America",
            "description": "WC Qualification"
        },
        {
            "id": 2080,
            "name": "South America",
            "description": "Copa America"
        },
        {
            "id": 2081,
            "name": "South America",
            "description": "Copa Sudamericana"
        },
        {
            "id": 2077,
            "name": "Spain",
            "description": "Segunda División"
        },
        {
            "id": 2078,
            "name": "Spain",
            "description": "Supercopa de España"
        },
        {
            "id": 2014,
            "name": "Spain",
            "description": "Primera Division"
        },
        {
            "id": 2079,
            "name": "Spain",
            "description": "Copa del Rey"
        },
        {
            "id": 2073,
            "name": "Sweden",
            "description": "Allsvenskan"
        },
        {
            "id": 2074,
            "name": "Sweden",
            "description": "Superettan"
        },
        {
            "id": 2075,
            "name": "Sweden",
            "description": "Playoffs 2/3"
        },
        {
            "id": 2076,
            "name": "Sweden",
            "description": "Playoffs 1/2"
        },
        {
            "id": 2071,
            "name": "Switzerland",
            "description": "Schweizer Pokal"
        },
        {
            "id": 2072,
            "name": "Switzerland",
            "description": "Super League"
        },
        {
            "id": 2069,
            "name": "Turkey",
            "description": "TFF Süper Kupa"
        },
        {
            "id": 2070,
            "name": "Turkey",
            "description": "Süper Lig"
        },
        {
            "id": 2068,
            "name": "Turkey",
            "description": "1. Lig"
        },
        {
            "id": 2065,
            "name": "Ukraine",
            "description": "Kubok Ukrainy"
        },
        {
            "id": 2064,
            "name": "Ukraine",
            "description": "Premier Liha"
        },
        {
            "id": 2066,
            "name": "Ukraine",
            "description": "Playoffs 1/2"
        },
        {
            "id": 2067,
            "name": "Ukraine",
            "description": "Superkubok Ukrainy"
        },
        {
            "id": 2145,
            "name": "United States",
            "description": "MLS"
        },
        {
            "id": 2063,
            "name": "Uruguay",
            "description": "Primera División"
        },
        {
            "id": 2062,
            "name": "Venezuela",
            "description": "Primera División"
        },
        {
            "id": 2061,
            "name": "Vietnam",
            "description": "V-League"
        },
        {
            "id": 2060,
            "name": "Wales",
            "description": "Welsh Premier League"
        },
        {
            "id": 2000,
            "name": "World",
            "description": "FIFA World Cup"
        }
    ]
}
// ------------------GET TEAMS BY COMPETITION ID SECTION
// ----------------------------------//
const competitionTeams = { 
	"count": 79,
	"teams": [
    {
      "id": 2,
      "name": "TSG 1899 Hoffenheim",
      "founded": 1921
    },
    {
      "id": 4,
      "name": "BV Borussia 09 Dortmund",
      "founded": 1909
    },
    {
      "id": 5,
      "name": "FC Bayern München",
      "founded": 1900
    },
    {
      "id": 6,
      "name": "FC Schalke 04",
      "founded": 1904
    },
    {
      "id": 64,
      "name": "Liverpool FC",
      "founded": 1892
    },
    {
      "id": 65,
      "name": "Manchester City FC",
      "founded": 1880
    },
    {
      "id": 66,
      "name": "Manchester United FC",
      "founded": 1878
    },
    {
      "id": 73,
      "name": "Tottenham Hotspur FC",
      "founded": 1882
    },
    {
      "id": 78,
      "name": "Club Atlético de Madrid",
      "founded": 1903
    },
    {
      "id": 81,
      "name": "FC Barcelona",
      "founded": 1899
    },
    {
      "id": 86,
      "name": "Real Madrid CF",
      "founded": 1902
    },
    {
      "id": 95,
      "name": "Valencia CF",
      "founded": 1919
    },
    {
      "id": 100,
      "name": "AS Roma",
      "founded": 1927
    },
    {
      "id": 108,
      "name": "FC Internazionale Milano",
      "founded": 1908
    },
    {
      "id": 109,
      "name": "Juventus FC",
      "founded": 1897
    },
    {
      "id": 113,
      "name": "SSC Napoli",
      "founded": 1904
    },
    {
      "id": 503,
      "name": "FC Porto",
      "founded": 1893
    },
    {
      "id": 523,
      "name": "Olympique Lyonnais",
      "founded": 1896
    },
    {
      "id": 524,
      "name": "Paris Saint-Germain FC",
      "founded": 1904
    },
    {
      "id": 548,
      "name": "AS Monaco FC",
      "founded": 1919
    },
    {
      "id": 610,
      "name": "Galatasaray SK",
      "founded": 1905
    },
    {
      "id": 611,
      "name": "Qarabağ Ağdam FK",
      "founded": 1951
    },
    {
      "id": 613,
      "name": "Fenerbahçe SK",
      "founded": 1907
    },
    {
      "id": 674,
      "name": "PSV",
      "founded": 1913
    },
    {
      "id": 678,
      "name": "AFC Ajax",
      "founded": 1900
    },
    {
      "id": 729,
      "name": "FC Basel 1893",
      "founded": 1893
    },
    {
      "id": 732,
      "name": "Celtic FC",
      "founded": 1887
    },
    {
      "id": 748,
      "name": "FK BATE Borisov",
      "founded": 1973
    },
    {
      "id": 749,
      "name": "Malmö FF",
      "founded": 1910
    },
    {
      "id": 752,
      "name": "APOEL FC",
      "founded": 1926
    },
    {
      "id": 754,
      "name": "FK Spartak Moskva",
      "founded": 1922
    },
    {
      "id": 755,
      "name": "GNK Dinamo Zagreb",
      "founded": 1903
    },
    {
      "id": 842,
      "name": "FK Dynamo Kyiv",
      "founded": 1927
    },
    {
      "id": 851,
      "name": "Club Brugge KV",
      "founded": 1894
    },
    {
      "id": 889,
      "name": "Rosenborg BK",
      "founded": 1917
    },
    {
      "id": 930,
      "name": "SK Slavia Praha",
      "founded": 1892
    },
    {
      "id": 1105,
      "name": "Legia Warszawa",
      "founded": 1916
    },
    {
      "id": 1866,
      "name": "Royal Standard de Liège",
      "founded": 1898
    },
    {
      "id": 1870,
      "name": "Alashkert FC",
      "founded": 1990
    },
    {
      "id": 1871,
      "name": "BSC Young Boys",
      "founded": 1898
    },
    {
      "id": 1875,
      "name": "F91 Diddeleng",
      "founded": 1991
    },
    {
      "id": 1877,
      "name": "FC Red Bull Salzburg",
      "founded": 1933
    },
    {
      "id": 1879,
      "name": "FC Santa Coloma",
      "founded": 1986
    },
    {
      "id": 1880,
      "name": "FC Sheriff Tiraspol",
      "founded": 1997
    },
    {
      "id": 1881,
      "name": "FC Viktoria Plzeň",
      "founded": 1911
    },
    {
      "id": 1884,
      "name": "Astana FK",
      "founded": 2009
    },
    {
      "id": 1886,
      "name": "FK Kukësi",
      "founded": 1930
    },
    {
      "id": 1887,
      "name": "FK Shakhtar Donetsk",
      "founded": 1936
    },
    {
      "id": 1888,
      "name": "FK Spartaks Jūrmala",
      "founded": 2007
    },
    {
      "id": 1891,
      "name": "Hapoel Be'er Sheva FC",
      "founded": 1950
    },
    {
      "id": 1894,
      "name": "HŠK Zrinjski Mostar",
      "founded": 1905
    },
    {
      "id": 1899,
      "name": "PAE AEK",
      "founded": 1924
    },
    {
      "id": 1900,
      "name": "PFC CSKA Moskva",
      "founded": 1911
    },
    {
      "id": 1901,
      "name": "PFK Ludogorets 1945 Razgrad",
      "founded": 2000
    },
    {
      "id": 1902,
      "name": "SP La Fiorita",
      "founded": 1933
    },
    {
      "id": 1903,
      "name": "Sport Lisboa e Benfica",
      "founded": 1904
    },
    {
      "id": 1904,
      "name": "The New Saints FC",
      "founded": 1959
    },
    {
      "id": 1905,
      "name": "Víkingur Gøta",
      "founded": 2008
    },
    {
      "id": 2021,
      "name": "SK Sturm Graz",
      "founded": 1909
    },
    {
      "id": 4485,
      "name": "FC Midtjylland",
      "founded": 1999
    },
    {
      "id": 5100,
      "name": "FC Flora",
      "founded": 1990
    },
    {
      "id": 5123,
      "name": "HJK",
      "founded": 1907
    },
    {
      "id": 5455,
      "name": "FK Lokomotiv Moskva",
      "founded": 1923
    },
    {
      "id": 5515,
      "name": "FC CFR 1907 Cluj",
      "founded": 1907
    },
    {
      "id": 5520,
      "name": "Cork City FC",
      "founded": 1912
    },
    {
      "id": 5740,
      "name": "Crusaders FC",
      "founded": 1898
    },
    {
      "id": 5813,
      "name": "Valletta FC",
      "founded": 1909
    },
    {
      "id": 5819,
      "name": "FK Sūduva Marijampolė",
      "founded": 1942
    },
    {
      "id": 5945,
      "name": "KF Valur Reykjavík",
      "founded": 1911
    },
    {
      "id": 5961,
      "name": "MOL Vidi FC",
      "founded": 1941
    },
    {
      "id": 6146,
      "name": "PAOK FC",
      "founded": 1926
    },
    {
      "id": 7281,
      "name": "Lincoln Red Imps FC",
      "founded": 1976
    },
    {
      "id": 7282,
      "name": "Drita KF Gjilan",
      "founded": 1947
    },
    {
      "id": 7283,
      "name": "FK Crvena Zvezda",
      "founded": 1945
    },
    {
      "id": 7284,
      "name": "FK Sutjeska Nikšić",
      "founded": 1927
    },
    {
      "id": 7285,
      "name": "KF Shkëndija 79",
      "founded": 1979
    },
    {
      "id": 7286,
      "name": "FC Torpedo Kutaisi",
      "founded": 1946
    },
    {
      "id": 7287,
      "name": "NK Olimpija Ljubljana",
      "founded": 1911
    },
    {
      "id": 7288,
      "name": "FC Spartak Trnava",
      "founded": 1923
    }
  ]
}

/*
● Gerir grupos de equipas favoritas  -> criar um indice
○ Criar grupo atribuindo-lhe um nome e descrição -> Metodo Create para inserir um grupo no indice previamente criado
○ Editar grupo, alterando o seu nome e descrição -> UPDATE/PUT de
○ Adicionar uma equipa a um grupo -> INSERT/POST uma equipa num grupo através do Id do grupo
○ Remover uma equipa de um grupo -> DELETE uma equipa de um grupo através de um Id
○ Obter os jogos das equipas de um grupo entre duas datas, sendo essas datas parametrizáveis no pedido.
	Os jogos de todas as equipas do um grupo vêm ordenados por ordem cronológica.
*/

module.exports = Foca