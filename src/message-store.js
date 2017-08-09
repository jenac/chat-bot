export class MessageStore {

    constructor(repository, folder, bot) {
        this.repository = repository;
        this.bot = bot;
        this.folder = folder
        this.fs = require('fs');
    }

    persist(message) {
        message._id = message.MsgId;
        this.repository.upsertMessage(message);
        switch (message.MsgType) {
            case this.bot.CONF.MSGTYPE_TEXT:
                break;
            case this.bot.CONF.MSGTYPE_IMAGE:
                this.bot.getMsgImg(message.MsgId).then(res => {
                    this.fs.writeFileSync(`${this.folder}/image/${message.MsgId}.jpg`, res.data);
                }).catch(err => {
                    this.bot.emit('error', err);
                })
                break;
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
        //     default:
        //         //should log into db
        //         break
        }

        // logger.instance.info(message);
    }

}

