import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranslateModule } from './transtale/translate.module';
import { DebugController } from './debug/debug.controller';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { WinstonModule } from 'nest-winston';
import { AsyncHooksModule } from '@nestjs-steroids/async-context';
import { LoggerModule } from './logger/logger.module';
import { DebugService } from './debug/debug.service';
import { DebugModule } from './debug/debug.module';

import ormMysqlConfig from './common/config/orm.mysql.config';
import ormMongoConfig from './common/config/orm.mongo.config';
import logWinstonConfig from './common/config/log.winston.config';

@Module({
  imports: [
    AsyncHooksModule,
    TypeOrmModule.forRoot(ormMongoConfig),
    TypeOrmModule.forRoot(ormMysqlConfig),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      playground: true,
      debug: true,
      introspection: true,
      autoSchemaFile: true, //join(process.cwd(), 'schema.gql'),
    }),
    WinstonModule.forRoot(logWinstonConfig),
    TranslateModule,
    LoggerModule,
    DebugModule,
  ],
  controllers: [DebugController],
  providers: [DebugService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
