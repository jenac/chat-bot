export class MessageStore {
   
    constructor(repository, folder, bot) {
        this.repository = repository;
        this.bot = bot;
        this.folder = folder
    }

    persist(message) {
        message._id = message.MsgId;
        this.repository.upsertMessage(message);
        // logger.instance.info(message);
    }
    
}

