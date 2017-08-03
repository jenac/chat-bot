import { logger } from './logger';
import { botConfig } from './bot-config';
import { LastKnownGood } from './last-known-good';
import { MongoRepository } from './mongo-repository';
const Wechat = require('wechat4u');
const qrcode = require('qrcode-terminal');

//init database
var MongoClient = require('mongodb').MongoClient;
let mongoRepository;
MongoClient.connect(botConfig.dbUrl, function (err, db) {
    if (err) {
        throw err;
    }

    mongoRepository = new MongoRepository(db);
});

const fs = require('fs');
//const request = require('request');

let lastKnownGood = new LastKnownGood(botConfig.lkgFile);

let bot;
try {
    bot = new Wechat(lastKnownGood.loadData());
} catch (e) {
    bot = new Wechat();
}

if (bot.PROP.uin) {
    // have last know good, just restart
    bot.restart();
} else {
    bot.start();
}

bot.on('uuid', uuid => {
    qrcode.generate('https://login.weixin.qq.com/l/' + uuid, { small: true });
    logger.instance.info('QR code linkï¼š', 'https://login.weixin.qq.com/qrcode/' + uuid)
})

bot.on('user-avatar', avatar => {
    logger.instance.info('User avatar Data URLï¼š', avatar);
})

bot.on('login', () => {
    logger.instance.info('login successful');
    //save last known good
    lastKnownGood.saveData(bot.botData);
})

bot.on('logout', () => {
    logger.instance.info('logout successful');
    //clear last known good
    lastKnownGood.cleanup();
})

bot.on('contacts-updated', contacts => {
    for(let c of contacts) {
        if (c.UserName.startsWith('@@')) {
            mongoRepository.upsertGroup(c, (err, res) => {
                if (err) logger.instance.error(err);
            });
        } else {
            mongoRepository.upsertContact(c, (err, res) => {
                if (err) logger.instance.error(err);
            });
        }
    }
})

bot.on('error', err => {
    logger.instance.error('errorï¼š', err);
})

bot.on('message', msg => {
    switch (msg.MsgType) {
        case bot.CONF.MSGTYPE_TEXT:
            persist(msg);
            break;
        case bot.CONF.MSGTYPE_IMAGE:
            persist(msg);
            bot.getMsgImg(msg.MsgId).then(res => {
                fs.writeFileSync(`./data/image/${msg.MsgId}.jpg`, res.data);
            }).catch(err => {
                bot.emit('error', err);
            })
            break;
        case bot.CONF.MSGTYPE_VOICE:
            persist(msg);
            bot.getVoice(msg.MsgId).then(res => {
                fs.writeFileSync(`./data/voice/${msg.MsgId}.mp3`, res.data)
            }).catch(err => {
                bot.emit('error', err)
            })
            break;
        case bot.CONF.MSGTYPE_EMOTICON:
            persist(msg);
            bot.getMsgImg(msg.MsgId).then(res => {
                console.log(res);
                fs.writeFileSync(`./data/emotion/${msg.MsgId}.gif`, res.data)
            }).catch(err => {
                bot.emit('error', err)
            })
            break
        case bot.CONF.MSGTYPE_VIDEO:
        case bot.CONF.MSGTYPE_MICROVIDEO:
            persist(msg);
            bot.getVideo(msg.MsgId).then(res => {
                console.log(res);
                fs.writeFileSync(`./data/video/${msg.MsgId}.mp4`, res.data)
            }).catch(err => {
                bot.emit('error', err)
            })
            break
        case bot.CONF.MSGTYPE_APP:
            //do not handle for now.
            // if (msg.AppMsgType == 6) {
            //     /**
            //      * æ–‡ä»¶æ¶ˆæ¯
            //      */
            //     console.log('æ–‡ä»¶æ¶ˆæ¯ï¼Œä¿å­˜åˆ°æœ¬åœ°')
            //     bot.getDoc(msg.FromUserName, msg.MediaId, msg.FileName).then(res => {
            //         fs.writeFileSync(`./media/${msg.FileName}`, res.data)
            //         console.log(res.type);
            //     }).catch(err => {
            //         bot.emit('error', err)
            //     })
            // }
            break
        default:
            //should log into db
            break
    }
})




function persist(message) {
    message._id = message.MsgId;
    mongoRepository.upsertMessage(message);
    logger.instance.info(message);
}