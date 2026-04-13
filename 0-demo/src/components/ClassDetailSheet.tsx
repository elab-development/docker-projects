import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ClassEntry, CLASS_LABELS, DAYS } from "@/lib/timetable-data";
import { Clock, MapPin, User } from "lucide-react";

interface Props {
  entry: ClassEntry | null;
  open: boolean;
  onClose: () => void;
}

const ClassDetailSheet = ({ entry, open, onClose }: Props) => {
  if (!entry) return null;

  const endHour = entry.startHour + entry.duration;
  const formatTime = (h: number) => `${Math.floor(h)}:${h % 1 ? "30" : "00"}`;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="bg-card">
        <SheetHeader>
          <SheetTitle className="font-heading text-xl">{entry.subject}</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <Badge variant="secondary" className="text-xs">{CLASS_LABELS[entry.type]}</Badge>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{DAYS[entry.day]}, {formatTime(entry.startHour)} – {formatTime(endHour)}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{entry.room}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="w-4 h-4" />
              <span>{entry.instructor}</span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ClassDetailSheet;
