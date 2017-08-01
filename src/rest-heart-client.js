import { botConfig } from './bot-config';
const Client = require('node-rest-client').Client;

class RestHeartClient {
    constructor() {
        let options_auth = { user: botConfig.restHeartUserId, password: botConfig.restHeartPassword };
        this.client = new Client(options_auth);
        this.handleResponse = function (data, response) {
            console.log('kkk');
            console.log(data);
            console.log(response);
        }
    }


    upsertMessage(message) {
        message.id = message.MsgId;
        let args = {
            data: message,
            headers: { "Content-Type": "application/json" }
        };
        this.client.put(`${botConfig.restHeartUrl}/messages/${message.MsgId}`, args, this.handleResponse);
    }
}

export let restHeartClient = new RestHeartClient();
