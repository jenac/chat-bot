const fs = require('fs');
export let botConfig = JSON.parse(fs.readFileSync(process.env.BOT_CONFIG_FILE), 'utf-8');

//example:
/*
{
    "dbUrl": "mongodb://localhost:27017/chat-bot",
    "lkgFile": "C:\\Projects\\chat-bot\\data\\lkg.json",
    "listen": 6688,
    "dataFolder": ".\\data"
}
*/