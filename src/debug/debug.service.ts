import { Inject, Injectable } from '@nestjs/common';
import { exec, listenTerminating, spawn, throwIfStderr } from 'rxjs-shell';
import { PubSub, PubSubEngine } from 'graphql-subscriptions';

import pubSub from '../common/pubsub';

@Injectable()
export class DebugService {
  async test(): Promise<any> {
    const arr = []; //.push()
    spawn(`src/common/bash/find.sh`).subscribe(
      (output) => {
        arr.push(output.chunk.toString('utf8'));
      },
      (err) => {
        console.log(err.toAnnotatedString()); // print annotated errors
      },
      () => {
        pubSub.publish('translateAdded', {
          translateAdded: { key: JSON.stringify(arr) },
        });
        console.log('!!!!!complete!!!!');
      },
    );

    return 'started';
  }
}
