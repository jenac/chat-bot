import { logger } from './logger';
import { botConfig } from './bot-config';
import { LastKnownGood } from './last-known-good';
import { MongoRepository } from './mongo-repository';
import { MessageStore } from './message-store';
import { MessageSender } from './message-sender'
const Wechat = require('wechat4u');
const qrcode = require('qrcode-terminal');

let messageStore;
//init database
var MongoClient = require('mongodb').MongoClient;
let mongoRepository;
let bot;
let mongoUrl = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${botConfig.mongoServer}:27017/${process.env.MONGO_INITDB_DATABASE}?authSource=admin`;
MongoClient.connect(mongoUrl, (err, db) => {
    if (err) { throw err; }
    mongoRepository = new MongoRepository(db);
    messageStore = new MessageStore(mongoRepository, botConfig.dataFolder, bot);
});

//init restify
const restify = require('restify');
var server = restify.createServer();
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.listen(botConfig.listen, () => {
    console.log('%s listening at %s', server.name, server.url);
});

let lastKnownGood = new LastKnownGood(botConfig.lkgFile);


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
let messageSender = new MessageSender(server, bot);

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
    logger.instance.error('error', err);
})

bot.on('message', msg => {
    messageStore.persist(msg);
    logger.instance.info(msg);
})

