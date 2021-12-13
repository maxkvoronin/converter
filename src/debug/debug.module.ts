import { Module } from '@nestjs/common';
import { DebugService } from './debug.service';
import { PubSub } from 'graphql-subscriptions';
import { DebugController } from './debug.controller';

@Module({
  providers: [DebugService, DebugController],
})
export class DebugModule {}
