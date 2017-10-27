import { AzureMdLogger } from './azure-md-logger';

const chai = require('chai');
var should = chai.should;
const expect = chai.expect;
const assert = chai.assert;

const sinon = require('sinon');

var ClientClass = require('node-rest-client').Client;
const client = new ClientClass();

describe('azure markdown logger', () => {
    it('post to MarkdownLogger', (done) => {
        let azureApi = 'https://botdock-devl.azurewebsites.net/api/MarkdownLogger?code=IbxaGlvdoaAzra2TWWT0Skoabn8SkAd5AeIghEmWwE1xwfjmPgt/UQ==&clientId=default';
        let azureMdLogger = new AzureMdLogger(azureApi, client);
        let message = { 
            "_id" : "165592161485574343", 
            "MsgId" : "165592161485574343", 
            "FromUserName" : "@@test", 
            "ToUserName" : "@73da225762f24d796842b687c57f91e3fc8c398897311c5f1db49036eeacdf39", 
            "Content" : "雪莲:\n星期天打一会儿？", 
            "FileName" : "", 
            "FileSize" : "", 
            "MediaId" : "", 
            "Url" : "", 
            "StatusNotifyUserName" : "", 
            "RecommendInfo" : {
                "UserName" : "", 
                "NickName" : "", 
                "Province" : "", 
                "City" : "", 
                "Content" : "", 
                "Signature" : "", 
                "Alias" : "", 
                "Ticket" : "", 
            }, 
            "AppInfo" : {
                "AppID" : "", 
            }, 
            "Ticket" : "", 
            "NewMsgId" : 165592161485574336.0, 
            "OriContent" : "", 
            "isSendBySelf" : false, 
            "OriginalContent" : "@e93e3adc1a75d5f7eb5b030f6223691bb89c712efc8e8576d626912d12d3fda5:<br/>星期天打一会儿？"
        };
        
        azureMdLogger.log(message);
        done();
    });
});

