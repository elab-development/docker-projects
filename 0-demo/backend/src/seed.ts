import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { ClassEntry } from './timetable/class-entry.entity';

config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  database: process.env.DB_NAME ?? 'timetable_db',
  entities: [ClassEntry],
  synchronize: true,
});

const SEED_DATA: Omit<ClassEntry, 'id' | 'createdAt' | 'updatedAt'>[] = [
  { subject: 'Data Structures',   type: 'lecture',  instructor: 'Dr. Smith',    room: 'A-201',  day: 0, startHour: 9,  duration: 2,   description: null },
  { subject: 'Data Structures',   type: 'lab',      instructor: 'Dr. Smith',    room: 'Lab-3',  day: 2, startHour: 14, duration: 2,   description: null },
  { subject: 'Linear Algebra',    type: 'lecture',  instructor: 'Prof. Johnson', room: 'B-105', day: 1, startHour: 10, duration: 1.5, description: null },
  { subject: 'Linear Algebra',    type: 'tutorial', instructor: 'TA Nguyen',    room: 'C-302',  day: 3, startHour: 13, duration: 1,   description: null },
  { subject: 'Operating Systems', type: 'lecture',  instructor: 'Dr. Lee',      room: 'A-101',  day: 0, startHour: 13, duration: 1.5, description: null },
  { subject: 'Operating Systems', type: 'lab',      instructor: 'Dr. Lee',      room: 'Lab-1',  day: 4, startHour: 9,  duration: 2,   description: null },
  { subject: 'Web Development',   type: 'seminar',  instructor: 'Prof. Garcia', room: 'D-210',  day: 1, startHour: 14, duration: 2,   description: null },
  { subject: 'Web Development',   type: 'lecture',  instructor: 'Prof. Garcia', room: 'A-305',  day: 3, startHour: 9,  duration: 1.5, description: null },
  { subject: 'Physics II',        type: 'lecture',  instructor: 'Dr. Patel',    room: 'B-202',  day: 2, startHour: 10, duration: 2,   description: null },
  { subject: 'Physics II',        type: 'lab',      instructor: 'Dr. Patel',    room: 'Lab-5',  day: 4, startHour: 13, duration: 2,   description: null },
];

async function seed() {
  await AppDataSource.initialize();
  console.log('Database connected.');

  const repo = AppDataSource.getRepository(ClassEntry);

  const existing = await repo.count();
  if (existing > 0) {
    console.log(`Skipping seed — ${existing} record(s) already exist.`);
    await AppDataSource.destroy();
    return;
  }

  const entries = repo.create(SEED_DATA);
  await repo.save(entries);

  console.log(`Seeded ${entries.length} class entries.`);
  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
