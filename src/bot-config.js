class BotConfig {
    constructor () {
        this.azDb =  process.env.AZ_DB;
        this.restHeartUrl = "http://localhost:8080/chat-bot";
        this.restHeartUserId = "admin";
        this.restHeartPassword = process.env.RESTHART_PASS;
    }
}
export let botConfig = new BotConfig();
