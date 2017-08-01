import { messageSendServer } from './message-send-server';


const chai = require('chai');

var chaiHttp = require('chai-http');

// var mongoose = require("mongoose");



// var server = require('../server/app');

// var Blob = require("../server/models/blob");



var should = chai.should;
const expect = chai.expect;
const assert = chai.assert;

chai.use(chaiHttp);

describe('message sender server', () => {
    it('should ok', (done) => {
        chai.request('http://localhost:3000')
            .post('/send')
            .send({id:123, name: 'waht is new'})
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            })
    })
})