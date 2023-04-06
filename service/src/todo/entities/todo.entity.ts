import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('todo_base')
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp' })
  entryTime: Date;

  @Column({ type: 'varchar', length: 255 })
  content: string;

  @Column({ default: false })
  completed: boolean;
}
