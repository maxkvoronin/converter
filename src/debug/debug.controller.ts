import { Controller, Get, Inject } from '@nestjs/common';
import { DebugService } from './debug.service';
import { PubSubEngine } from 'graphql-subscriptions';

@Controller('debug')
export class DebugController {
  constructor(private readonly debugService: DebugService) {}

  @Get()
  async getDebug(): Promise<any> {
    return this.debugService.test();
  }
}
