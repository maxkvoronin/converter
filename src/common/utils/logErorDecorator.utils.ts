import { Inject } from '@nestjs/common';
import { LoggerService } from '../../logger/logger.service';

export function Log(bubble = false) {
  const injectLogger = Inject(LoggerService);

  return (target: any, propertyKey: string, propertyDescriptor: PropertyDescriptor) => {
    injectLogger(target, 'logger'); // this is the same as using constructor(private readonly logger: LoggerService) in a class

    //get original method
    const originalMethod = propertyDescriptor.value;

    //redefine descriptor value within own function block
    propertyDescriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        const logger: LoggerService = this.logger;
        //target.constructor.name,
        logger.error(error.message, this.ctx.get('requestId'), error.stack);

        // rethrow error, so it can bubble up
        if (bubble) {
          throw error;
        }
      }
    };
  };
}
