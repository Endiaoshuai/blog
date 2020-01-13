import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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
  @Column({ type: 'text', nullable: true })
  public content: string;

  // @Field(() => User, { nullable: true })
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
