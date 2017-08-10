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
            case this.bot.CONF.MSGTYPE_VOICE:
                this.bot.getVoice(message.MsgId).then(res => {
                    this.fs.writeFileSync(`${this.folder}/voice/${message.MsgId}.mp3`, res.data)
                }).catch(err => {
                    this.bot.emit('error', err)
                })
                break;
            case this.bot.CONF.MSGTYPE_EMOTICON:
                this.bot.getMsgImg(message.MsgId).then(res => {
                    this.fs.writeFileSync(`${this.folder}/emotion/${message.MsgId}.gif`, res.data)
                }).catch(err => {
                    this.bot.emit('error', err)
                })
                break
            case this.bot.CONF.MSGTYPE_VIDEO:
            case this.bot.CONF.MSGTYPE_MICROVIDEO:
                this.bot.getVideo(message.MsgId).then(res => {
                    this.fs.writeFileSync(`${this.folder}/video/${message.MsgId}.mp4`, res.data)
                }).catch(err => {
                    this.bot.emit('error', err)
                })
                break
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

