import { Module } from '@nestjs/common';
import { TranslateService } from './translate.service';
import { Translate } from './entities/translate.mongo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranslateResolver } from './translate.resolver';
import { TranslateMysqlEntity } from './entities/translate.mysql.entity';
import { PubSub } from 'graphql-subscriptions';

@Module({
  imports: [
    TypeOrmModule.forFeature([Translate], 'mongo'),
    TypeOrmModule.forFeature([TranslateMysqlEntity], 'mysql'),
  ],
  providers: [TranslateResolver, TranslateService],
})
export class TranslateModule {}
