//todo passin callback
export class MongoRepository {
    constructor(mongo) {
        this.messageCollection = mongo.collection('messages');
        this.contactCollection = mongo.collection('contacts');
        this.groupCollection = mongo.collection('groups');
    }

    upsertMessage(message) {
        message._id = message.MsgId;
        this.messageCollection.save(message, (err, res) => {
            if (err) throw err;
        });
    }

    upsertContact(contact) {
        contact._id = contact.UserName;
        this.contactCollection.save(contact, (err, res) => {
            if (err) throw err;
        });
    }

    upsertGroup(group, callback) {
        group._id = group.UserName;
        this.groupCollection.save(group, callback);
    }
}

