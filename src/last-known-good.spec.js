import { LastKnownGood } from './last-known-good';

const chai = require('chai');
const assert = chai.assert;

var lkgFile = 'dummy.json';
describe('Last Know Good', () => {
    it('save/load/clean data', () => {
        let l1 = new LastKnownGood(lkgFile);
        l1.saveData({foo: "bar"});

        let d = l1.loadData();
        assert(l1.loadData().foo == "bar");

        l1.cleanup();
        let fs = require('fs');
        assert(!fs.existsSync(l1.lkgFile));
    })
})
