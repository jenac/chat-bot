class BotConfig {
    constructor () {
        this.dbUrl =  process.env.BOT_DB_URL;
        this.lkgFile = process.env.BOT_LKG_FILE;
        this.listen = process.env.BOT_LISTEN_PORT;
        // this.dataFolder = process.env.BOT_DATA_FOLDER;
    }
}
export let botConfig = new BotConfig();
