import { botConfig } from './bot-config';
import { EmailSender } from './email-sender';

describe('email sender', () => {
    it('send mail', () => {
        let emailSender = new EmailSender(botConfig.email);
        emailSender.send('lihe.chen@gmail.com', 'message from chat-bot text', 'chat-bot can send an email!' );
    })
})
