import { Field, ID, ObjectType } from 'type-graphql';
import {
  AfterLoad,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { User } from '../user/user.entity';

@ObjectType()
@Entity()
export class Article extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  public id: number;

  @Field()
  @Column()
  public title: string;

  @Field()
  @Column({ type: 'text' })
  public content: string;

  @Field(() => User)
  // @Column({ nullable: false })
  @ManyToOne(
    () => User,
    user => user.articles,
    { onDelete: 'CASCADE' },
  )
  public user: User;

  @Field()
  @CreateDateColumn()
  public createAt: Date;

  @Field()
  @UpdateDateColumn()
  public updateAt: Date;
}
