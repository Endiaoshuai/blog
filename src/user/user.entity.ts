import * as bcrypt from 'bcryptjs';

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
  OneToMany,
} from 'typeorm';

import { Article } from '../article/article.entity';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  public id: number;

  @Field()
  @Column()
  public email: string;

  @Column()
  public password: string;

  @Field()
  @CreateDateColumn()
  public createAt: Date;

  @Field()
  @UpdateDateColumn()
  public updateAt: Date;

  private tempPassword: string;

  @AfterLoad()
  private loadTempPassword(): void {
    this.tempPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  private encryptPassword(): void {
    if (this.tempPassword !== this.password) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync());
      this.loadTempPassword();
    }
  }

  @Field(() => [Article])
  @OneToMany(
    () => Article,
    article => article.user,
  )
  public articles: Article[];
}
