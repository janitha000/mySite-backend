const winston = require('winston');
const winstonCloudWatch = require('winston-cloudwatch')

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [

        new winston.transports.File({ filename: '/logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: '/logs/logs.log' })
    ]
})

const cloudWatchCOnfig = {
    logGroupName: "API_SERVER_LG",
    logStreamName: 'API_SERVER',
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
    awsRegion: process.env.AWS_REGION,
    messageFormatter: ({ level, message, additionalInfo }) => `[${level}] : ${message} \nAdditional Info: ${JSON.stringify(additionalInfo)}}`
}

logger.add(new winstonCloudWatch(cloudWatchCOnfig));

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}


module.exports = logger;