import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Shift } from "../types/employee";

interface ScheduleEditorProps {
  shifts: Shift[];
  onSave: (shifts: Shift[]) => void;
}

export const ScheduleEditor = ({ shifts, onSave }: ScheduleEditorProps) => {
  const [editedShifts, setEditedShifts] = useState<Shift[]>(shifts);
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const addShift = (day: string) => {
    const newShift: Shift = {
      id: crypto.randomUUID(),
      day,
      startTime: "09:00",
      endTime: "17:00",
      employeeId: shifts[0]?.employeeId || "",
    };
    setEditedShifts([...editedShifts, newShift]);
  };

  const updateShift = (shiftId: string, field: "startTime" | "endTime", value: string) => {
    setEditedShifts(
      editedShifts.map((shift) =>
        shift.id === shiftId ? { ...shift, [field]: value } : shift
      )
    );
  };

  const removeShift = (shiftId: string) => {
    setEditedShifts(editedShifts.filter((shift) => shift.id !== shiftId));
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        {days.map((day) => (
          <div key={day} className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{day}</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addShift(day)}
              >
                Add Shift
              </Button>
            </div>
            <div className="space-y-2">
              {editedShifts
                .filter((shift) => shift.day === day)
                .map((shift) => (
                  <div
                    key={shift.id}
                    className="flex items-center gap-2 bg-secondary/50 p-2 rounded-md"
                  >
                    <Input
                      type="time"
                      value={shift.startTime}
                      onChange={(e) =>
                        updateShift(shift.id, "startTime", e.target.value)
                      }
                      className="w-32"
                    />
                    <span>to</span>
                    <Input
                      type="time"
                      value={shift.endTime}
                      onChange={(e) =>
                        updateShift(shift.id, "endTime", e.target.value)
                      }
                      className="w-32"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeShift(shift.id)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      <Button onClick={() => onSave(editedShifts)} className="w-full">
        Save Schedule
      </Button>
    </div>
  );
};