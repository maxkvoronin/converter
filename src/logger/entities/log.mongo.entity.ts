import {
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Log {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  message: string;

  @Column()
  context: string;

  @Column()
  data: string;

  @CreateDateColumn()
  created_at: Date;
}
