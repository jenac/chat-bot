import { MessageStore } from './message-store';

const chai = require('chai');
var should = chai.should;
const expect = chai.expect;
const assert = chai.assert;
const sinon = require('sinon');

describe('message store', () => {
    it('store text message', (done) => {
        let mockBot = {};
        let mockFolder = 'aa';
        let message = {
            MsgId: 'mocked-id'
        };
        let upsertCalled = false;
        let mockRepository = {
            upsertMessage: (message) => {
                assert(message != null);
                assert(message._id == "mocked-id");
                upsertCalled = true;
            }
        };
        let messageStore = new MessageStore(mockRepository, mockFolder, mockBot);
        messageStore.persist(message);
        assert(upsertCalled);
        done();
    });
});


