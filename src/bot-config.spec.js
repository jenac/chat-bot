import { botConfig } from './bot-config';
const chai = require('chai');
const assert = chai.assert;

describe('bot config', () => {
    it('configured correctly', () => {
        assert(botConfig != null && botConfig != undefined);
        assert(botConfig.azDb != null && botConfig.azDb != undefined);
        assert(botConfig.restHeartPassword != null && botConfig.restHeartPassword != undefined);
        
    })
})