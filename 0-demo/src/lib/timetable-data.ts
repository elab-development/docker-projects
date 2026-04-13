export type ClassType = "lecture" | "lab" | "tutorial" | "seminar";

export interface ClassEntry {
  id: string;
  subject: string;
  type: ClassType;
  instructor: string;
  room: string;
  day: number; // 0=Mon, 4=Fri
  startHour: number; // 8-18
  duration: number; // in hours
  description?: string;
}

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
export const HOURS = Array.from({ length: 11 }, (_, i) => i + 8); // 8-18

export const SAMPLE_CLASSES: ClassEntry[] = [
  { id: "1", subject: "Data Structures", type: "lecture", instructor: "Dr. Smith", room: "A-201", day: 0, startHour: 9, duration: 2 },
  { id: "2", subject: "Data Structures", type: "lab", instructor: "Dr. Smith", room: "Lab-3", day: 2, startHour: 14, duration: 2 },
  { id: "3", subject: "Linear Algebra", type: "lecture", instructor: "Prof. Johnson", room: "B-105", day: 1, startHour: 10, duration: 1.5 },
  { id: "4", subject: "Linear Algebra", type: "tutorial", instructor: "TA Nguyen", room: "C-302", day: 3, startHour: 13, duration: 1 },
  { id: "5", subject: "Operating Systems", type: "lecture", instructor: "Dr. Lee", room: "A-101", day: 0, startHour: 13, duration: 1.5 },
  { id: "6", subject: "Operating Systems", type: "lab", instructor: "Dr. Lee", room: "Lab-1", day: 4, startHour: 9, duration: 2 },
  { id: "7", subject: "Web Development", type: "seminar", instructor: "Prof. Garcia", room: "D-210", day: 1, startHour: 14, duration: 2 },
  { id: "8", subject: "Web Development", type: "lecture", instructor: "Prof. Garcia", room: "A-305", day: 3, startHour: 9, duration: 1.5 },
  { id: "9", subject: "Physics II", type: "lecture", instructor: "Dr. Patel", room: "B-202", day: 2, startHour: 10, duration: 2 },
  { id: "10", subject: "Physics II", type: "lab", instructor: "Dr. Patel", room: "Lab-5", day: 4, startHour: 13, duration: 2 },
];

export const CLASS_COLORS: Record<ClassType, string> = {
  lecture: "bg-class-lecture",
  lab: "bg-class-lab",
  tutorial: "bg-class-tutorial",
  seminar: "bg-class-seminar",
};

export const CLASS_LABELS: Record<ClassType, string> = {
  lecture: "Lecture",
  lab: "Lab",
  tutorial: "Tutorial",
  seminar: "Seminar",
};
