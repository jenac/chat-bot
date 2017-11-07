import { botConfig } from './bot-config';
const chai = require('chai');
const assert = chai.assert;

describe('bot config', () => {
    it('configured correctly', () => {
        assert(botConfig != null && botConfig.lkgFile != undefined);
        assert(botConfig.mongoServer != null && botConfig.mongoServer != undefined);
        assert(botConfig != null && botConfig.listen != undefined);
        assert(botConfig != null && botConfig.dataFolder != undefined);
        assert(botConfig != null && botConfig.azRRsiUrl != undefined);
        
    })
})