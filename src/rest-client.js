import restHeart from './rest-heart';
const Client = require('node-rest-client').Client;

class RestClient {
    constructor() {
        let options_auth = { user: restHeart.userId, password: restHeart.password };
        this.client = new Client(options_auth);
        this.messageUrl = `http://${restHeart.server}:${restHeart.port}/${restHeart.database}/messages`;
    }

    upsertMessage(message) {
        message.id = message.MsgId;
        let args = {
            data: message,
            headers: { "Content-Type": "application/json" }
        };
        this.client.put(`${this.messageUrl}/${message.MsgId}`, args, function (data, response) {
            console.log(data);
        });
    }
}

export let restClient = new RestClient();
