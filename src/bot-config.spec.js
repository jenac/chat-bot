import { botConfig } from './bot-config';
const chai = require('chai');
const assert = chai.assert;

describe('bot config', () => {
    it('configured correctly', () => {
        assert(botConfig != null && botConfig.lkgFile != undefined);
        assert(botConfig.dbUrl != null && botConfig.dbUrl != undefined);
        assert(botConfig != null && botConfig.listen != undefined);
    })
})