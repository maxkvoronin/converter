import { Global, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { AsyncHooksModule } from '@nestjs-steroids/async-context';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from './entities/log.mongo.entity';

@Global()
@Module({
  imports: [AsyncHooksModule, TypeOrmModule.forFeature([Log], 'mongo')],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
