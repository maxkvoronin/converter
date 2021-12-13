import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'translates' })
export class TranslateMysqlEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column({ default: '' })
  rus: string;

  @Column({ default: '' })
  eng: string;
}
