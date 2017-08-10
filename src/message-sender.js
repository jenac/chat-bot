export class MessageSender {
   
    constructor(restify, bot) {
        this.restify = restify;
        this.bot = bot;
        this.restify.post('/send', (req, res, next) => this.send(req, res, next));
    }

    send(req, res, next) {
        var message = req.body;
        this.bot.sendMsg(message.data, message.to);
        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
        res.end(JSON.stringify(message));
        return next();
                
    }
    
}

