const Wechat = require('wechat4u');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const request = require('request');
const lastKnowGoodPath = './data/lkg.json';
const winston = require('winston');
require('winston-daily-rotate-file');

var transport = new winston.transports.DailyRotateFile({
    filename: './bot.log',
    datePattern: 'yyyy-MM-dd.',
    prepend: true,
    level: process.env.ENV === 'development' ? 'debug' : 'info'
  });

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        transport
    ]
});

let bot;
try {
    bot = new Wechat(require(lastKnowGoodPath));
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
    logger.info('QR code link：', 'https://login.weixin.qq.com/qrcode/' + uuid)
})

bot.on('user-avatar', avatar => {
    logger.info('User avatar Data URL：', avatar);
})

bot.on('login', () => {
    logger.info('login successful');
    //save last known good
    fs.writeFileSync(lastKnowGoodPath, JSON.stringify(bot.botData));
})

bot.on('logout', () => {
    logger.info('logout successful');
    //clear last known good
    fs.unlinkSync(lastKnowGoodPath);
})

bot.on('contacts-updated', contacts => {
    //console.log(contacts);
    logger.info('total: ', Object.keys(bot.contacts).length);
})

bot.on('error', err => {
    logger.error('error：', err);
})

bot.on('message', msg => {
    let persistMessage = {
        msgId: msg.MsgId,
        from: msg.FromUserName,
        to: msg.ToUserName,
        fromDisplayName: bot.contacts[msg.FromUserName].getDisplayName(),
        toDisplayName: bot.contacts[msg.ToUserName].getDisplayName(),
        type: msg.MsgType,
        timeCreated: msg.CreateTime,
        content: msg.Content,
        originalContent: msg.OriginalContent,
        isSendBySelf: msg.isSendBySelf
    };

    switch (msg.MsgType) {
        case bot.CONF.MSGTYPE_TEXT:
            persist(persistMessage);
            break;
        case bot.CONF.MSGTYPE_IMAGE:
            persist(persistMessage);
            bot.getMsgImg(msg.MsgId).then(res => {
                fs.writeFileSync(`./data/image/${msg.MsgId}.jpg`, res.data);
            }).catch(err => {
                bot.emit('error', err);
            })
            break;
        case bot.CONF.MSGTYPE_VOICE:
            persist(persistMessage);
            bot.getVoice(msg.MsgId).then(res => {
                fs.writeFileSync(`./data/voice/${msg.MsgId}.mp3`, res.data)
            }).catch(err => {
                bot.emit('error', err)
            })
            break;
        case bot.CONF.MSGTYPE_EMOTICON:
            persist(persistMessage);
            bot.getMsgImg(msg.MsgId).then(res => {
                console.log(res);
                fs.writeFileSync(`./data/emotion/${msg.MsgId}.gif`, res.data)
            }).catch(err => {
                bot.emit('error', err)
            })
            break
        case bot.CONF.MSGTYPE_VIDEO:
        case bot.CONF.MSGTYPE_MICROVIDEO:
            persist(persistMessage);
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
            //      * 文件消息
            //      */
            //     console.log('文件消息，保存到本地')
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
    logger.info(message);
}