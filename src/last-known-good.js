const fs = require('fs');

export class LastKnownGood {
    constructor(lkgFile) {
        this.lkgFile = lkgFile;
    }

    loadData() {
        try {
            let fs = require('fs');
            let data = JSON.parse(fs.readFileSync(this.lkgFile, 'utf8'));
            return data;
        } catch(e) {
            return null;
        }
    }

    saveData(data) {
        fs.writeFileSync(this.lkgFile, JSON.stringify(data));
    }
}
