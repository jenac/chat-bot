const fs = require('fs');
export let botConfig = JSON.parse(fs.readFileSync(process.env.BOT_CONFIG_FILE), 'utf-8');

//example:
/*
{
    "mongoServer": "localhost",
    "lkgFile": "./data/lkg.json",
    "listen": 6688,
    "dataFolder": "./data",
    "azRRsiUrl": "https://botdock-devl.azurewebsites.net/api/ReverseRsi?code=hRP0Dsar4NunvQWB56pn1QOnmLqy2lajsahjX7EnRANAn7ZX0Uh8pA==&clientId=default"
}

*/