export class MessageSender {
    constructor(restify, bot) {
        this.restify = restify;
        this.bot = bot;
        this.restify.post('/send', this.send);
    }

    send(req, res, next) {
        var user = req.body;
        user.id = 9087;
        console.log('this.bot:', this);
        this.bot.sendMessage();
        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
        res.end(JSON.stringify(user));
        return next();
                
    }
    
}

