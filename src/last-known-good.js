const fs = require('fs');
const lastKnownGoodPath = './data/lkg.json';
const lkgData = require(lastKnownGoodPath);

class LastKnownGood {
    constructor() {
        
    }

    loadData() {
        console.log('reading');
        return lkgData
    }

    saveData(data) {
        console.log('writing');
        fs.writeFileSync(lastKnownGoodPath, JSON.stringify(data));
    }
}

export let lastKnownGood = new LastKnownGood();