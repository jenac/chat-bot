import { MessageStore } from './message-store';

const chai = require('chai');
var should = chai.should;
const expect = chai.expect;
const assert = chai.assert;
const sinon = require('sinon');

let mockFolder = './tmp';
let mockId = 'mocked-id';
let mockBot = {
    CONF: {
        MSGTYPE_IMAGE: 101,
        MSGTYPE_TEXT: 201,
        MSGTYPE_VOICE: 301,
        MSGTYPE_EMOTICON: 401,
        MSGTYPE_VIDEO: 501,
        MSGTYPE_MICROVIDEO: 502
    },
    getMsgImg: (id) => {
        assert(id == mockId);
        return Promise.resolve({
            then: function (onFulfill, onReject) { onFulfill({ data: 'image message!' }); }
        });
    },
    getVoice: (id) => {
        assert(id == mockId);
        return Promise.resolve({
            then: function (onFulfill, onReject) { onFulfill({ data: 'voice message!' }); }
        });
    },
    getVideo: (id) => {
        assert(id != null);
        return Promise.resolve({
            then: function (onFulfill, onReject) { onFulfill({ data: 'video message!' }); }
        });
    },
    emit: (name, err) => {
        throw err;
    }
};

let upsertCalled = false;
let mockRepository = {
    upsertMessage: (message) => {
        assert(message != null);
        assert(message._id == message.MsgId);
        upsertCalled = true;
    }
};

let fse = require('fs-extra');


describe('message store', () => {
    before(() => {
        fse.ensureDirSync(`${mockFolder}/image`);
        fse.ensureDirSync(`${mockFolder}/voice`);
        fse.ensureDirSync(`${mockFolder}/emotion`);
        fse.ensureDirSync(`${mockFolder}/video`);
    });

    after(() => {
        fse.removeSync(mockFolder);
    })

    beforeEach(() => {
        upsertCalled = false;
    })
    it('store text message', (done) => {
        let message = {
            MsgId: mockId,
            MsgType: mockBot.CONF.MSGTYPE_TEXT
        };

        let messageStore = new MessageStore(mockRepository, mockFolder, mockBot);
        messageStore.persist(message);
        assert(upsertCalled);
        done();
    });

    it('store image message', (done) => {
        let message = {
            MsgId: mockId,
            MsgType: mockBot.CONF.MSGTYPE_IMAGE
        };
        
        let messageStore = new MessageStore(mockRepository, mockFolder, mockBot);
        messageStore.persist(message);
        assert(upsertCalled);

        assert(fse.pathExists(`${mockFolder}/image/${mockId}.jpg`));
        done();
    });

    it('store voice message', (done) => {
        let message = {
            MsgId: mockId,
            MsgType: mockBot.CONF.MSGTYPE_VOICE
        };
        
        let messageStore = new MessageStore(mockRepository, mockFolder, mockBot);
        messageStore.persist(message);
        assert(upsertCalled);

        assert(fse.pathExists(`${mockFolder}/voice/${mockId}.mp3`));
        done();
    });

    it('store emotion message', (done) => {
        let message = {
            MsgId: mockId,
            MsgType: mockBot.CONF.MSGTYPE_EMOTICON
        };
        
        let messageStore = new MessageStore(mockRepository, mockFolder, mockBot);
        messageStore.persist(message);
        assert(upsertCalled);

        assert(fse.pathExists(`${mockFolder}/emotion/${mockId}.gif`));
        done();
    });

    it('store video message', (done) => {
        let message = {
            MsgId: mockId,
            MsgType: mockBot.CONF.MSGTYPE_VIDEO
        };
        
        let messageStore = new MessageStore(mockRepository, mockFolder, mockBot);
        messageStore.persist(message);
        assert(upsertCalled);

        assert(fse.pathExists(`${mockFolder}/video/${mockId}.mp4`));
        done();
    });
    
    it('store micro video message', (done) => {
        let message = {
            MsgId: mockId + '-micro',
            MsgType: mockBot.CONF.MSGTYPE_MICROVIDEO
        };
        
        let messageStore = new MessageStore(mockRepository, mockFolder, mockBot);
        messageStore.persist(message);
        assert(upsertCalled);

        assert(fse.pathExists(`${mockFolder}/video/${mockId}-micro.mp4`));
        done();
    });

    xit('store app message', (done) => {
        done();
    });

    //  case bot.CONF.MSGTYPE_IMAGE:
    //         persist(msg);
    //         bot.getMsgImg(msg.MsgId).then(res => {
    //             fs.writeFileSync(`./data/image/${msg.MsgId}.jpg`, res.data);
    //         }).catch(err => {
    //             bot.emit('error', err);
    //         })
    //         break;
    //     case bot.CONF.MSGTYPE_VOICE:
    //         persist(msg);
    //         bot.getVoice(msg.MsgId).then(res => {
    //             fs.writeFileSync(`./data/voice/${msg.MsgId}.mp3`, res.data)
    //         }).catch(err => {
    //             bot.emit('error', err)
    //         })
    //         break;
    //     case bot.CONF.MSGTYPE_EMOTICON:
    //         persist(msg);
    //         bot.getMsgImg(msg.MsgId).then(res => {
    //             console.log(res);
    //             fs.writeFileSync(`./data/emotion/${msg.MsgId}.gif`, res.data)
    //         }).catch(err => {
    //             bot.emit('error', err)
    //         })
    //         break
    //     case bot.CONF.MSGTYPE_VIDEO:
    //     case bot.CONF.MSGTYPE_MICROVIDEO:
    //         persist(msg);
    //         bot.getVideo(msg.MsgId).then(res => {
    //             console.log(res);
    //             fs.writeFileSync(`./data/video/${msg.MsgId}.mp4`, res.data)
    //         }).catch(err => {
    //             bot.emit('error', err)
    //         })
    //         break
    //     case bot.CONF.MSGTYPE_APP:
    //         //do not handle for now.
    //         // if (msg.AppMsgType == 6) {
    //         //     /**
    //         //      * æ–‡ä»¶æ¶ˆæ¯
    //         //      */
    //         //     console.log('æ–‡ä»¶æ¶ˆæ¯ï¼Œä¿å­˜åˆ°æœ¬åœ°')
    //         //     bot.getDoc(msg.FromUserName, msg.MediaId, msg.FileName).then(res => {
    //         //         fs.writeFileSync(`./media/${msg.FileName}`, res.data)
    //         //         console.log(res.type);
    //         //     }).catch(err => {
    //         //         bot.emit('error', err)
    //         //     })
    //         // }
    //         break
});


