import restHeartConfig from './rest-heart-config';
const Client = require('node-rest-client').Client;

class RestHeartClient {
    constructor() {
        let options_auth = { user: restHeartConfig.userId, password: restHeartConfig.password };
        this.client = new Client(options_auth);
        this.messageUrl = `http://${restHeartConfig.server}:${restHeartConfig.port}/${restHeartConfig.database}/messages`;
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

    initializeDatabase() {
        
    }
}

export let restHeartClient = new RestHeartClient();
