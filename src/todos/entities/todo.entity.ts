import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('todos')
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', length: 70, nullable: false })
  name: string;

  @Column({ name: 'description', length: 255 })
  description: string;

  @Column({ name: 'is_completed', default: false })
  isCompleted: boolean;
}
