'use strict'
const expect = require('chai').expect
const assert = require('chai').assert
const should = require('chai').should()
const foca = require('../lib/foca-mock.js')
//const foca = require('../foca-services')

const fs = require('fs')

describe('test foca', () => {
    const es = {
        host: 'localhost',
        port: '9200',
        foca_index: 'foca',
        football_api:'http://api.football-data.org/v2/',
        Api_token: '8bd8bc20012b426996fe49aaad58f7ef' // might create another object or delete this
    }
    it('Should initialize a Foca service object', done => {
        const focaaux = foca.init(es)
        expect(focaaux)
            .to.be.an('object')
        done()
    })

    it('Should get all the Competitions', done => {
        const focaaux = foca.init(es)
        focaaux
              .getCompetitions()
              .then(resp => {
                  should.exist(resp)
                  expect(resp)
                  .to.be.an('object')
                  .and.have.a.property('count', 147)
                  done()

              })
             .catch(err =>{
                  should.not.exist(err)
                  done()
              })
            }
    ) 

   it('should get teams by competition id', done => {
        const focaaux = foca.init(es)
        focaaux
            .getTeamsByCompetitionId('2000')
            .then( resp => {
                    should.exist(resp)
                    expect(resp)
                    .to.be.have.a.property('teams')
                    .with
                    .length(32)
                expect(resp.teams[0])
                    .to.have.a
                    .property('id', 758)
                    done()
                })
            
    })

   /* it('Should create a group and manage it', done => {
        const focaaux = foca.init(es)
        focaaux.createGroup('Favoritos', 'equipas favoritas', (err, resp) => {
            should
                .not
                .exist(err)
            should.exist(resp)
            expect(resp)
                .to
                .be
                .an('object')
            expect(resp.groups)
                .to
                .be
                .an('array')
            expect(resp.groups[0])
                .to
                .have
                .a
                .property('id', 123)
            expect(resp.groups[0])
                .to
                .have
                .a
                .property('name', 'Favoritos')
            expect(resp.groups[0])
                .to
                .have
                .a
                .property('description', 'equipas favoritas')

            focaaux.getGroups((err, resp) => {
                should
                    .not
                    .exist(err)
                should.exist(resp)
                expect(resp)
                    .to
                    .be
                    .an('object')
                expect(resp.groups)
                    .to
                    .be
                    .an('array')
                    .with
                    .length(1)

            })

            focaaux.editGroup(123, 'Melhores', 'Melhores equipas', (err, resp) => {
                should
                    .not
                    .exist(err)
                should.exist(resp)
                expect(resp)
                    .to
                    .be
                    .an('object')
                expect(resp.groups)
                    .to
                    .be
                    .an('array')
                expect(resp.groups[0])
                    .to
                    .have
                    .a
                    .property('id', 123)
                expect(resp.groups[0])
                    .to
                    .have
                    .a
                    .property('name', 'Melhores')
                expect(resp.groups[0])
                    .to
                    .have
                    .a
                    .property('description', 'Melhores equipas')

                focaaux.insertGroupTeam(123, 2000, 758, (err, resp) => {
                    should
                        .not
                        .exist(err)
                    should.exist(resp)
                    expect(resp)
                        .to
                        .be
                        .an('object')
                    expect(resp.groups[0].teams)
                        .to
                        .be
                        .an('array')
                        .with
                        .length(1)

                    focaaux.deleteGroupTeam(123, 758, (err, resp) => {
                        should
                            .not
                            .exist(err)
                        should.exist(resp)
                        expect(resp)
                            .to
                            .be
                            .an('object')
                        expect(resp.groups[0].teams)
                            .to
                            .be
                            .an('array')
                            .with
                            .length(0)

                        done()
                    })

                })

            })
        })

    })*/
    /*
	it('Should edit a group', done => {
		const focaaux = foca.init(es)
		focaaux.editGroup(
		*/

})
