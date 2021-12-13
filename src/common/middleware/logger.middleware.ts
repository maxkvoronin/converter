import { Injectable, NestMiddleware } from '@nestjs/common';
import { AsyncContext } from '@nestjs-steroids/async-context';
import { createHash } from 'crypto';
import { LoggerService } from '../../logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService, private readonly hook: AsyncContext) {}

  use(req: any, res: any, next: () => void) {
    const requestId = createHash('md5').update(new Date().toISOString()).digest('hex');
    this.hook.register();
    this.hook.set('requestId', requestId);
    this.logger.log('request', requestId, req.body.query);
    next();
  }
}
