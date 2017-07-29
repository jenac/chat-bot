const fs = require('fs');
const lastKnownGoodPath = '/home/lihe/Projects/chat-bot/data/lkg.json';

class LastKnownGood {
    constructor() {
        this.lkgData = null;
    }

    loadData() {
        console.log('reading');
        try {
            this.lkgData = require(lastKnownGoodPath);
        } catch(e) {
            this.lkgData = null;
        }
        return this.lkgData;
    }

    saveData(data) {
        console.log('writing');
        fs.writeFileSync(lastKnownGoodPath, JSON.stringify(data));
    }
}

export let lastKnownGood = new LastKnownGood();