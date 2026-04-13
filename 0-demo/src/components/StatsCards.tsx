import { ClassEntry } from "@/lib/timetable-data";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Clock, FlaskConical, GraduationCap } from "lucide-react";

interface Props {
  classes: ClassEntry[];
}

const StatsCards = ({ classes }: Props) => {
  const totalHours = classes.reduce((sum, c) => sum + c.duration, 0);
  const subjects = new Set(classes.map((c) => c.subject)).size;
  const labs = classes.filter((c) => c.type === "lab").length;

  const stats = [
    { label: "Total Classes", value: classes.length, icon: BookOpen },
    { label: "Weekly Hours", value: totalHours, icon: Clock },
    { label: "Subjects", value: subjects, icon: GraduationCap },
    { label: "Lab Sessions", value: labs, icon: FlaskConical },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((s) => (
        <Card key={s.label} className="border-border/50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent">
              <s.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-heading font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
