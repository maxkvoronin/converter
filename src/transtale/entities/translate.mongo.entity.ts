/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType({ description: 'Dictionary of variable translations for the site' })
export class Translate {
  @ObjectIdColumn()
  @Field((type) => ID, { description: 'Unique index' })
  id: ObjectID;

  @Column()
  @Field({ description: 'Variable name' })
  key: string;

  @Column()
  @Field({ description: 'Russian translation', nullable: true })
  rus?: string;

  @Column()
  @Field({ description: 'English translation', nullable: true })
  eng?: string;
}
