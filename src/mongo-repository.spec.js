import { MongoRepository } from './mongo-repository';

const chai = require('chai');
var should = chai.should;
const expect = chai.expect;
const assert = chai.assert;

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/chat-bot-test";
console.log(url);
MongoClient.connect(url, function (err, db) {
    if (err) {
        throw err;
    }

    describe('mongo repository', () => {
        let mongoRepository = new MongoRepository(db);
        it('save message', (done) => {
            var message = {
                "MsgId": "177389166873616968",
                "FromUserName": "@fe7fba99086c2d313375d01cfdb1f45ebb9d89339961890bfb0afadac040fd43",
                "ToUserName": "@@b0adaadf38472f22a9cd5f3cfc1c691514a0544aec359e1dc2e7996a31c39be4",
                "MsgType": 1,
                "Content": "测试asdfasfd一下",
                "Status": 3,
                "ImgStatus": 1,
                "CreateTime": 1500430874,
                "VoiceLength": 0,
                "PlayLength": 0,
                "FileName": "",
                "FileSize": "",
                "MediaId": "",
                "Url": "",
                "AppMsgType": 0,
                "StatusNotifyCode": 0,
                "StatusNotifyUserName": "",
                "RecommendInfo": {
                    "UserName": "",
                    "NickName": "",
                    "QQNum": 0,
                    "Province": "",
                    "City": "",
                    "Content": "",
                    "Signature": "",
                    "Alias": "",
                    "Scene": 0,
                    "VerifyFlag": 0,
                    "AttrStatus": 0,
                    "Sex": 0,
                    "Ticket": "",
                    "OpCode": 0
                },
                "ForwardFlag": 0,
                "AppInfo": {
                    "AppID": "",
                    "Type": 0
                },
                "HasProductId": 0,
                "Ticket": "",
                "ImgHeight": 0,
                "ImgWidth": 0,
                "SubMsgType": 0,
                "NewMsgId": 177389166873616960,
                "OriContent": "",
                "isSendBySelf": true,
                "OriginalContent": "测试asdfasdf一下",
                "level": "info",
                "message": "",
                "timestamp": "2017-07-19T02:21:20.476Z"
            };

            message._id = message.MsgId;
            mongoRepository.upsertMessage(message);

            db.collection('messages').findOne({_id: message.MsgId}, function(err, data) {
                assert(err == null);
                assert(data != null);
                done();
            });
            
        })
    })
});

