export class MongoRepository {
    constructor(mongo) {
        this.messageCollection = mongo.collection('messages');
    }

    upsertMessage(message) {
        message._id = message.MsgId;
        this.messageCollection.save(message, (err, res) => {
            if (err) throw err;
        });
    }
}

