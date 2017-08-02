const restify = require('restify');

class MessageSendServer {
    constructor() {
        var server = restify.createServer();
        server.use(restify.plugins.acceptParser(server.acceptable));
        server.use(restify.plugins.queryParser());
        server.use(restify.plugins.bodyParser());
        
        server.post('/send', this.send);
        server.listen(3000, function () {
            console.log('%s listening at %s', server.name, server.url);
        });
    }

    send(req, res, next) {
        var user = req.body;
        console.log(user);
        user.id = 9087;
        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
        res.end(JSON.stringify(user));
        return next();
                
    }
}

//http://code.runnable.com/UkGlFTWB0zBGAAGj/example-restful-api-with-restify-for-node-js

export let messageSendServer = new MessageSendServer();
