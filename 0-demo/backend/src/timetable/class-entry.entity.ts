import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export type ClassType = 'lecture' | 'lab' | 'tutorial' | 'seminar';

@Entity('class_entries')
export class ClassEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  subject: string;

  @Column({ type: 'enum', enum: ['lecture', 'lab', 'tutorial', 'seminar'] })
  type: ClassType;

  @Column({ length: 100 })
  instructor: string;

  @Column({ length: 50 })
  room: string;

  /** 0 = Monday … 4 = Friday */
  @Column({ type: 'smallint' })
  day: number;

  /** Hour of day (8–18) */
  @Column({ type: 'numeric', precision: 4, scale: 1, name: 'start_hour' })
  startHour: number;

  /** Duration in hours (e.g. 1, 1.5, 2) */
  @Column({ type: 'numeric', precision: 4, scale: 1 })
  duration: number;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
