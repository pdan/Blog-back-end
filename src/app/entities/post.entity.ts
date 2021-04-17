// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from './user.entity'
import { Tag } from './tag.entity'


@Entity()
export class Post extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string

  @Column()
  content: string

  @Column()
  summary: string

  @Column()
  created: number

  @ManyToOne(() => User, user => user.posts)
  user: User

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[]

}
