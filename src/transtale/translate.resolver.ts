/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Translate } from './entities/translate.mongo.entity';
import { TranslateService } from './translate.service';
import { Inject, NotFoundException } from '@nestjs/common';
import { NewTranslateInput } from './dto/new-translate.input';
import { UpdateTranslateInput } from './dto/update-transtale.input';
import { FindTranslateInput } from './dto/find-translate.input';
import { PubSubEngine } from 'graphql-subscriptions';

import pubSub from '../common/pubsub';

@Resolver((of) => Translate)
export class TranslateResolver {
  constructor(private readonly translateService: TranslateService) {}

  @Query((returns) => Translate, {
    description: 'Get single translate by key',
  })
  async translate(@Args('key') key: string): Promise<Translate> {
    const translate = await this.translateService.findOne(key);
    if (!translate) {
      throw new NotFoundException(key);
    }
    return translate;
  }

  @Query((returns) => [Translate], {
    description: 'Find translates by any fields',
  })
  async translates(
    @Args({ name: 'findTranslateData' }) findTranslateData: FindTranslateInput,
  ): Promise<Translate[]> {
    const translates = await this.translateService.find(findTranslateData);
    if (!translates?.length) {
      throw new NotFoundException();
    }
    return translates;
  }

  @Mutation((returns) => Translate)
  async addTranslate(
    @Args('newTranslateData') newTranslateData: NewTranslateInput,
  ): Promise<Translate> {
    const newTranslate = await this.translateService.create(newTranslateData);
    pubSub.publish('translateAdded', { translateAdded: newTranslateData });
    return newTranslate;
  }

  @Mutation((returns) => Translate)
  async updateTranslate(
    @Args('updateTranslateData') updateTranslateData: UpdateTranslateInput,
  ): Promise<Translate> {
    const updatedTranslate = await this.translateService.update(
      updateTranslateData,
    );
    pubSub.publish('translateUpdated', {
      translateUpdated: updateTranslateData,
    });
    return updatedTranslate;
  }

  @Mutation((returns) => Boolean)
  async deleteTranslate(@Args('key') key: string): Promise<boolean> {
    return await this.translateService.deleteByKey(key);
  }

  @Mutation((returns) => Boolean, {
    description: 'For mongo sync after mysql edit',
  })
  async _sync(): Promise<boolean> {
    return await this.translateService.sync();
  }

  @Subscription((returns) => Translate)
  translateAdded() {
    return pubSub.asyncIterator('translateAdded');
  }

  @Subscription((returns) => Translate)
  translateUpdated() {
    return pubSub.asyncIterator('translateUpdated');
  }
}
