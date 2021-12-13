import { LoggerOptions } from 'winston';
import * as dotenv from 'dotenv';
import * as winston from 'winston';
import { utilities } from 'nest-winston';

dotenv.config();

const config: LoggerOptions = {
  transports: [
    new winston.transports.Console(
      process.env.NODE_ENV === 'production'
        ? {
            format: winston.format.simple(),
          }
        : {
            format: winston.format.combine(
              utilities.format.nestLike(process.env.APP_NAME, {
                prettyPrint: true,
              }),
            ),
          },
    ),
  ],
};

export default config;
