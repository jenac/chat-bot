import { MessageSender } from './message-sender';

const chai = require('chai');
var should = chai.should;
const expect = chai.expect;
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const sinon = require('sinon');

const restify = require('restify');
var server = restify.createServer();
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.listen(3000, () => {
    console.log('%s listening at %s', server.name, server.url);
});

describe('message sender', () => {
    it('post to /send', (done) => {
        let botSendCalled = false;
        let messageTo = "shahala";
        let messageData = "text message here";
        var bot = {
            sendMessage: (data, to) => {
                botSendCalled = true;
                assert(to == messageTo);
                assert(data == messageData);
            }
        };
        let messageSender = new MessageSender(server, bot);

        chai.request('http://localhost:3000')
            .post('/send')
            .set('content-type', 'application/json')
            .send({ to: messageTo, data: messageData})
            .end((err, res) => {
                assert(err == null);
                assert(res.status == 200);
                assert(botSendCalled);
                assert(res.body != null);
                done();
            });
    });
});


