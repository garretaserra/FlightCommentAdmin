import {expect} from 'chai';
import {Done} from 'mocha';
import CommentSchema from "../models/Comment";
import chai = require('chai');
import chaiHttp = require('chai-http');
import mongoose = require('mongoose');

chai.use(chaiHttp);

//Mongo database connection
let dbHost: string = 'localhost';
let dbPort: number = 27017;
let dbName: string = 'FlightCommentAdmin'
mongoose.connect('mongodb://' + dbHost + ':' + dbPort + '/' + dbName,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() =>{
    console.log('Connection to the database successful');
}).catch(err =>{
    console.log(`Database error: ${err.message}`);
});

describe('Test comment endpoints', function () {
    describe('test comment validation', function () {
        it('Should fail when flightId not provided', function (done: Done) {
            chai.request('http://localhost:8080/comment').post('/newComment').send({comment: 'comment', UserId: '123'})
                .end((err: any, res: any) =>{
                expect(res).to.have.status(400);
                expect(res.text).to.be.equal('Missing FlightId')
                done();
            });
        });

        it('Should fail when UserId not provided', function (done: Done) {
            chai.request('http://localhost:8080/comment').post('/newComment').send({comment: 'comment', FlightId: '123'})
                .end((err: any, res: any) =>{
                    expect(res).to.have.status(400);
                    expect(res.text).to.be.equal('Missing UserId')
                    done();
                });
        });

        it('Should fail when comment not provided', function (done: Done) {
            chai.request('http://localhost:8080/comment').post('/newComment').send({FlightId: '123', UserId: '123'})
                .end((err: any, res: any) =>{
                    expect(res).to.have.status(400);
                    expect(res.text).to.be.equal('Missing comment')
                    done();
                });
        });

    });

    describe('Writing and retrieving comment from database', function () {
        it('Should write a new comment to the database', function (done: Done) {
            chai.request('http://localhost:8080/comment').post('/newComment').send({comment: 'This is a test comment', FlightId: '123', UserId: '123'})
                .end((err: any, res: any) =>{
                    expect(res).to.have.status(200);
                    done();
                });
        });

        it('Should retrieve the previous comment from the database', function (done: Done) {
            chai.request('http://localhost:8080/comment').get('/getComments')
                .end((err: any, res: any) => {
                    expect(res).to.have.status(200);

                    // Test that there is more than 0 objects (in the array) that contain the property values of the test comment
                    expect(res.body).to.be.an('array');
                    expect((res.body.filter((comment: any) => {
                        return comment.comment === 'This is a test comment' && comment.FlightId === 123 && comment.UserId === 123
                    })).length).to.greaterThan(0);
                    done();
                });
        });

        after('Delete added test comment', async function () {
            return CommentSchema.deleteMany({comment: 'This is a test comment'});
        })
    })
})
