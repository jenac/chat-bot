import { MongoRepository } from './mongo-repository';

const chai = require('chai');
var should = chai.should;
const expect = chai.expect;
const assert = chai.assert;

var MongoClient = require('mongodb').MongoClient;
var url = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/chat-bot-test`;

MongoClient.connect(url, (err, db) => {
    if (err) { throw err; }

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

            mongoRepository.upsertMessage(message);

            db.collection('messages').findOne({ _id: message.MsgId }, (err, data) => {
                assert(err == null);
                assert(data != null);
                done();
            });

        });

        it('save contact', (done) => {
            let contact = {
                "Uin": 0,
                "UserName": "@9fc7cd209e00c66e5ac2ba8bfe71b1bf17bb5612a021dcd7a6c8df0c25c09364",
                "NickName": "付科",
                "HeadImgUrl": "/cgi-bin/mmwebwx-bin/webwxgeticon?seq=650690683&username=@9fc7cd209e00c66e5ac2ba8bfe71b1bf17bb5612a021dcd7a6c8df0c25c09364&skey=",
                "ContactFlag": 3,
                "MemberCount": 0,
                "MemberList": [],
                "RemarkName": "",
                "HideInputBarFlag": 0,
                "Sex": 0,
                "Signature": "知行合一",
                "VerifyFlag": 0,
                "OwnerUin": 0,
                "PYInitial": "FK",
                "PYQuanPin": "fuke",
                "RemarkPYInitial": "",
                "RemarkPYQuanPin": "",
                "StarFriend": 0,
                "AppAccountFlag": 0,
                "Statues": 0,
                "AttrStatus": 549,
                "Province": "河北",
                "City": "沧州",
                "Alias": "",
                "SnsFlag": 17,
                "UniFriend": 0,
                "DisplayName": "",
                "ChatRoomId": 0,
                "KeyWord": "",
                "EncryChatRoomId": "0",
                "IsOwner": 0,
                "OrignalNickName": "付科",
                "OriginalNickName": "付科",
                "OrignalRemarkName": "",
                "OriginalRemarkName": "",
                "OrignalDisplayName": "",
                "OriginalDisplayName": "",
                "isSelf": false
            };
            mongoRepository.upsertContact(contact);
            db.collection('contacts').findOne({ _id: contact.UserName }, (err, data) => {
                assert(err == null);
                assert(data != null);
                done();
            });
        });

        it('save group', (done) => {
            let group = {
                "Uin": 0,
                "UserName": "@@6b618e51cfe5a64e2f5a7e380c093b87f1cde423c4c2a41be990e573d0ca1eec",
                "NickName": "chaty-boy,HUi,Zhaotheninja,L Chen",
                "HeadImgUrl": "/cgi-bin/mmwebwx-bin/webwxgetheadimg?seq=0&username=@@6b618e51cfe5a64e2f5a7e380c093b87f1cde423c4c2a41be990e573d0ca1eec&skey=@crypt_2b946137_d00032c3edd11bd0170ade6483ff402a",
                "ContactFlag": 0,
                "MemberCount": 4,
                "MemberList": [
                    {
                        "Uin": 0,
                        "UserName": "@769e5019d6fc2617d61efc9ea3f1448d523e1feeb1e3fd76b8aba8d9b43132ab",
                        "NickName": "",
                        "AttrStatus": 0,
                        "PYInitial": "",
                        "PYQuanPin": "",
                        "RemarkPYInitial": "",
                        "RemarkPYQuanPin": "",
                        "MemberStatus": 0,
                        "DisplayName": "",
                        "KeyWord": ""
                    },
                    {
                        "Uin": 0,
                        "UserName": "@f988e24bb0d540948c0920f10df58042c0a579ef70fd74f00b0c785ae1dcf47a",
                        "NickName": "",
                        "AttrStatus": 0,
                        "PYInitial": "",
                        "PYQuanPin": "",
                        "RemarkPYInitial": "",
                        "RemarkPYQuanPin": "",
                        "MemberStatus": 0,
                        "DisplayName": "",
                        "KeyWord": ""
                    },
                    {
                        "Uin": 0,
                        "UserName": "@3cb9cda0eb5da3f461f3969b6515f2af98e35f76052cca960ab47a0cadce1865",
                        "NickName": "",
                        "AttrStatus": 0,
                        "PYInitial": "",
                        "PYQuanPin": "",
                        "RemarkPYInitial": "",
                        "RemarkPYQuanPin": "",
                        "MemberStatus": 0,
                        "DisplayName": "",
                        "KeyWord": ""
                    },
                    {
                        "Uin": 0,
                        "UserName": "@9e774a21e2ece35e6771b1ec0da4d9fcecd244118ce26b91447fd496b6fb58ba",
                        "NickName": "",
                        "AttrStatus": 0,
                        "PYInitial": "",
                        "PYQuanPin": "",
                        "RemarkPYInitial": "",
                        "RemarkPYQuanPin": "",
                        "MemberStatus": 0,
                        "DisplayName": "",
                        "KeyWord": ""
                    }
                ],
                "RemarkName": "",
                "HideInputBarFlag": 0,
                "Sex": 0,
                "Signature": "",
                "VerifyFlag": 0,
                "OwnerUin": 0,
                "PYInitial": "",
                "PYQuanPin": "",
                "RemarkPYInitial": "",
                "RemarkPYQuanPin": "",
                "StarFriend": 0,
                "AppAccountFlag": 0,
                "Statues": 1,
                "AttrStatus": 0,
                "Province": "",
                "City": "",
                "Alias": "",
                "SnsFlag": 0,
                "UniFriend": 0,
                "DisplayName": "",
                "ChatRoomId": 0,
                "KeyWord": "",
                "EncryChatRoomId": "",
                "IsOwner": 1,
                "OrignalNickName": "chaty-boy,HUi,Zhaotheninja,L Chen",
                "OriginalNickName": "chaty-boy,HUi,Zhaotheninja,L Chen",
                "OrignalRemarkName": "",
                "OriginalRemarkName": "",
                "OrignalDisplayName": "",
                "OriginalDisplayName": "",
                "isSelf": false
            };

            mongoRepository.upsertGroup(group, (err, res) => {
            db.collection('groups').findOne({ _id: group.UserName }, (err, data) => {
                assert(err == null);
                assert(data != null);
                done();
            });                    
            });
            
        });
    })
});

