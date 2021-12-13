import { Inject, Injectable } from '@nestjs/common';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Log } from './entities/log.mongo.entity';

type ErrorLog = {
  created_at: Date;
  message: string;
  context: string;
  data: string;
};

@Injectable()
export class LoggerService {
  constructor(
    @InjectRepository(Log, 'mongo')
    private readonly mongoRepository: MongoRepository<Log>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  private prepareLog(message: string, context?: string, data?: any): ErrorLog {
    return {
      created_at: new Date(),
      message: message,
      context,
      data: JSON.stringify(data),
    };
  }

  log(message: string, context?: string, data?: any): void {
    const logMessage = this.prepareLog(message, context, data);
    this.logger.info(logMessage);
    this.mongoRepository.save(logMessage);
  }

  error(message: string, context: string, data?: any): void {
    const logMessage = this.prepareLog(message, context, data);
    this.logger.error(logMessage);
    this.mongoRepository.save(logMessage);
  }
}
