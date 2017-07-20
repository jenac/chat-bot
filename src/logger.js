const winston = require('winston');
require('winston-daily-rotate-file');


class Logger {
    constructor() {

        this.transport = new winston.transports.DailyRotateFile({
            filename: './bot.log',
            datePattern: 'yyyy-MM-dd.',
            prepend: true,
            level: process.env.ENV === 'development' ? 'debug' : 'info'
        });

        this.instance = new (winston.Logger)({
            transports: [
                new (winston.transports.Console)(),
                this.transport
            ]
        });
    }

}

export let logger = new Logger();