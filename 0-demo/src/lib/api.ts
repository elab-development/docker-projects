import { ClassEntry } from './timetable-data';

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export async function fetchClasses(): Promise<ClassEntry[]> {
  const res = await fetch(`${BASE_URL}/timetable`);
  if (!res.ok) throw new Error('Failed to fetch timetable');
  const data: ClassEntry[] = await res.json();
  // TypeORM returns numbers as strings for numeric columns; coerce them
  return data.map((c) => ({
    ...c,
    day: Number(c.day),
    startHour: Number(c.startHour),
    duration: Number(c.duration),
  }));
}

export async function createClass(
  entry: Omit<ClassEntry, 'id'>,
): Promise<ClassEntry> {
  const res = await fetch(`${BASE_URL}/timetable`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.message ?? 'Failed to create class');
  }
  const data: ClassEntry = await res.json();
  return {
    ...data,
    day: Number(data.day),
    startHour: Number(data.startHour),
    duration: Number(data.duration),
  };
}

export async function deleteClass(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/timetable/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete class');
}
