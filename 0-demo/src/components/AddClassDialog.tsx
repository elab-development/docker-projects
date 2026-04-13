import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ClassEntry, ClassType, DAYS, CLASS_LABELS } from "@/lib/timetable-data";

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (entry: ClassEntry) => void;
}

const AddClassDialog = ({ open, onClose, onAdd }: Props) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<ClassType>("lecture");
  const [day, setDay] = useState("0");
  const [startHour, setStartHour] = useState("9");
  const [duration, setDuration] = useState("1");
  const [room, setRoom] = useState("");
  const [instructor, setInstructor] = useState("");
  const [description, setDescription] = useState("");

  const reset = () => {
    setTitle("");
    setType("lecture");
    setDay("0");
    setStartHour("9");
    setDuration("1");
    setRoom("");
    setInstructor("");
    setDescription("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !room.trim()) return;

    onAdd({
      id: crypto.randomUUID(),
      subject: title.trim(),
      type,
      instructor: instructor.trim(),
      room: room.trim(),
      day: Number(day),
      startHour: Number(startHour),
      duration: Number(duration),
      description: description.trim(),
    });
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) { reset(); onClose(); } }}>
      <DialogContent className="sm:max-w-[480px] bg-card">
        <DialogHeader>
          <DialogTitle className="font-heading text-lg">Add New Class</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input id="title" placeholder="e.g. Data Structures" value={title} onChange={(e) => setTitle(e.target.value)} required maxLength={100} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Label *</Label>
              <Select value={type} onValueChange={(v) => setType(v as ClassType)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {(Object.keys(CLASS_LABELS) as ClassType[]).map((t) => (
                    <SelectItem key={t} value={t}>{CLASS_LABELS[t]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Day *</Label>
              <Select value={day} onValueChange={setDay}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {DAYS.map((d, i) => (
                    <SelectItem key={i} value={String(i)}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Time *</Label>
              <Select value={startHour} onValueChange={setStartHour}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 11 }, (_, i) => i + 8).map((h) => (
                    <SelectItem key={h} value={String(h)}>{`${h}:00`}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Duration (hours) *</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["0.5", "1", "1.5", "2", "2.5", "3"].map((d) => (
                    <SelectItem key={d} value={d}>{d}h</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="room">Location *</Label>
              <Input id="room" placeholder="e.g. A-201" value={room} onChange={(e) => setRoom(e.target.value)} required maxLength={50} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instructor">Instructor</Label>
              <Input id="instructor" placeholder="e.g. Dr. Smith" value={instructor} onChange={(e) => setInstructor(e.target.value)} maxLength={100} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Optional notes..." value={description} onChange={(e) => setDescription(e.target.value)} maxLength={500} rows={3} />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => { reset(); onClose(); }}>Cancel</Button>
            <Button type="submit">Add Class</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddClassDialog;
