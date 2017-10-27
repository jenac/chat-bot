import { AzureMdLogger } from './azure-md-logger';

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

describe('loggmessage sender', () => {
    it('post to /send', (done) => {
        let azureApi = 'https://botdock-devl.azurewebsites.net/api/MarkdownLogger?code=IbxaGlvdoaAzra2TWWT0Skoabn8SkAd5AeIghEmWwE1xwfjmPgt/UQ==&clientId=default';
        let azureMdLogger = new AzureMdLogger(azureApi);
        let message = {

        }
        let response = azureMdLogger.log(message);
        assert(response != false);
    });
});


