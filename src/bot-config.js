const fs = require('fs');
export let botConfig = JSON.parse(fs.readFileSync(process.env.BOT_CONFIG_FILE), 'utf-8');

//example:
/*
{
    "mongoServer": "localhost",
    "lkgFile": "./data/lkg.json",
    "listen": 6688,
    "dataFolder": "./data",
    "azMdLoggerUrl": "https://botdock-devl.azurewebsites.net/api/MarkdownLogger?code=IbxaGlvdoaAzra2TWWT0Skoabn8SkAd5AeIghEmWwE1xwfjmPgt/UQ==&clientId=default",
    "azRRsiUrl": "https://botdock-devl.azurewebsites.net/api/ReverseRsi?code=hRP0Dsar4NunvQWB56pn1QOnmLqy2lajsahjX7EnRANAn7ZX0Uh8pA==&clientId=default"
}

*/