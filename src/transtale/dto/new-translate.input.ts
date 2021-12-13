import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, MaxLength } from 'class-validator';

@InputType({ description: 'Inputs for dictionary translations for the site' })
export class NewTranslateInput {
  @Field({ description: 'Key of translate record' })
  @MaxLength(255)
  key: string;

  @Field({ description: 'Russian translation', nullable: true })
  @IsOptional()
  rus?: string;

  @Field({ description: 'English translation', nullable: true })
  @IsOptional()
  eng?: string;
}
