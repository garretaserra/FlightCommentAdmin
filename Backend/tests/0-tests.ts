import {expect} from 'chai';
import {Done} from 'mocha';
import chai = require('chai');
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Server Test', function () {
    describe('test get method', function () {
        it('Should respond with it works', function (done: Done) {
            chai.request('http://localhost:8080/test/get').get('/').end((err: any, res: any) =>{
                expect(res).to.have.status(200);
                expect(res.text).to.be.equal('It works')
                done();
            })
        });
    });

    describe('test post method', function () {
        it('Should respond with it works', function (done: Done) {
            chai.request('http://localhost:8080/test/post').post('/').end((err: any, res: any) =>{
                expect(res).to.have.status(200);
                expect(res.text).to.be.equal('It works')
                done();
            })
        })
    })
})

