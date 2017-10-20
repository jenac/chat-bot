const fs = require('fs');
export let botConfig = JSON.parse(fs.readFileSync(process.env.BOT_CONFIG_FILE), 'utf-8');

//example:
/*
{
    "mongoServer": "localhost",
    "lkgFile": "./data/lkg.json",
    "listen": 6688,
    "dataFolder": "./data"
}
*/