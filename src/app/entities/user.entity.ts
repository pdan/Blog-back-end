// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { hashPassword } from '@foal/core';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Post } from './post.entity'

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name?: string;

  @Column()
  family?: string

  @OneToMany(() => Post, post => post.user)
  posts: Post[]

  async setPassword(password: string) {
    this.password = await hashPassword(password);
  }
}
