import { ClassEntry, DAYS, HOURS, CLASS_COLORS } from "@/lib/timetable-data";

interface Props {
  classes: ClassEntry[];
  onClassClick: (entry: ClassEntry) => void;
}

const TimetableGrid = ({ classes, onClassClick }: Props) => {
  const getClassAt = (day: number, hour: number) =>
    classes.filter((c) => c.day === day && hour >= c.startHour && hour < c.startHour + c.duration);

  const isStart = (c: ClassEntry, hour: number) => c.startHour === hour;

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px] grid grid-cols-[80px_repeat(5,1fr)] gap-px bg-border rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-card p-3" />
        {DAYS.map((day) => (
          <div key={day} className="bg-card p-3 text-center font-heading font-semibold text-sm text-foreground">
            {day}
          </div>
        ))}

        {/* Time rows */}
        {HOURS.map((hour) => (
          <>
            <div key={`t-${hour}`} className="bg-card p-3 text-xs font-medium text-muted-foreground text-right pr-4">
              {hour}:00
            </div>
            {DAYS.map((_, dayIdx) => {
              const entries = getClassAt(dayIdx, hour);
              const startEntries = entries.filter((e) => isStart(e, hour));
              const continuingEntries = entries.filter((e) => !isStart(e, hour));

              return (
                <div key={`${dayIdx}-${hour}`} className="bg-card min-h-[56px] relative p-0.5">
                  {startEntries.map((entry) => (
                    <button
                      key={entry.id}
                      onClick={() => onClassClick(entry)}
                      className={`${CLASS_COLORS[entry.type]} text-primary-foreground w-full rounded-md p-2 text-left text-xs leading-tight hover:opacity-90 transition-opacity cursor-pointer`}
                      style={{ height: `${entry.duration * 56 - 4}px`, position: "absolute", top: 2, left: 2, right: 2, zIndex: 10 }}
                    >
                      <span className="font-semibold block truncate">{entry.subject}</span>
                      <span className="opacity-80 block truncate">{entry.room}</span>
                    </button>
                  ))}
                  {startEntries.length === 0 && continuingEntries.length === 0 && (
                    <div className="w-full h-full" />
                  )}
                </div>
              );
            })}
          </>
        ))}
      </div>
    </div>
  );
};

export default TimetableGrid;
