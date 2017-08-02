class BotConfig {
    constructor () {
        this.dbUrl =  process.env.BOT_DB_URL;
        this.lkgFile = process.env.BOT_LKG_FILE;
    }
}
export let botConfig = new BotConfig();
