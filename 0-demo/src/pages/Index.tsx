import { useEffect, useState } from "react";
import { ClassEntry, CLASS_LABELS, CLASS_COLORS } from "@/lib/timetable-data";
import { fetchClasses, createClass } from "@/lib/api";
import TimetableGrid from "@/components/TimetableGrid";
import ClassDetailSheet from "@/components/ClassDetailSheet";
import AddClassDialog from "@/components/AddClassDialog";
import StatsCards from "@/components/StatsCards";
import { Button } from "@/components/ui/button";
import { CalendarDays, Plus } from "lucide-react";

const Index = () => {
  const [classes, setClasses] = useState<ClassEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<ClassEntry | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  useEffect(() => {
    fetchClasses()
      .then(setClasses)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async (entry: ClassEntry) => {
    try {
      const { id: _ignored, ...rest } = entry;
      const saved = await createClass(rest);
      setClasses((prev) => [...prev, saved]);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save class");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {error && (
        <div className="bg-destructive/10 border border-destructive text-destructive text-sm px-4 py-2 text-center">
          {error}
        </div>
      )}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary">
              <CalendarDays className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-heading font-bold text-foreground">My Timetable</h1>
              <p className="text-sm text-muted-foreground">Spring 2026 Semester</p>
            </div>
          </div>
          <Button onClick={() => setAddOpen(true)} size="sm" className="gap-1.5">
            <Plus className="w-4 h-4" /> Add Class
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {loading ? (
          <div className="text-center text-muted-foreground py-12">Loading timetable…</div>
        ) : (
          <>
            <StatsCards classes={classes} />

            {/* Legend */}
            <div className="flex flex-wrap gap-3">
              {(Object.keys(CLASS_LABELS) as Array<keyof typeof CLASS_LABELS>).map((type) => (
                <div key={type} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className={`w-3 h-3 rounded ${CLASS_COLORS[type]}`} />
                  {CLASS_LABELS[type]}
                </div>
              ))}
            </div>

            <TimetableGrid classes={classes} onClassClick={setSelected} />
          </>
        )}
      </main>

      <ClassDetailSheet entry={selected} open={!!selected} onClose={() => setSelected(null)} />
      <AddClassDialog open={addOpen} onClose={() => setAddOpen(false)} onAdd={handleAdd} />
    </div>
  );
};

export default Index;
