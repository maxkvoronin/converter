import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, MaxLength } from 'class-validator';

@InputType({ description: 'Inputs for dictionary translations for the site' })
export class FindTranslateInput {
  @Field({ description: 'Key of translate record', nullable: true })
  @MaxLength(255)
  @IsOptional()
  key?: string;

  @Field({ description: 'Russian translation', nullable: true })
  @IsOptional()
  rus?: string;

  @Field({ description: 'English translation', nullable: true })
  @IsOptional()
  eng?: string;
}
