export class EmailSender{
    constructor(config) {
        const email = require('emailjs/email');
        this.config = config;
        this.server = email.server.connect(config);
    }

    send(to, subject, text) {
        this.server.send({
            text: text,
            from: `chat-bot<${this.config.user}>`,
            to: to, 
            subject: subject
        }, (err, message)=> {
            if (err) { throw err };
            console.log(message);
        })
        

    }
}