// src/user/user.entity.ts
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  username: string;

  @Column({ length: 255, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;
}
