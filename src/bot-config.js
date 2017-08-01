class BotConfig {
    constructor () {
        this.dbUrl =  process.env.BOT_DB_URL;
    }
}
export let botConfig = new BotConfig();
