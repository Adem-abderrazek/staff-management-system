import { Employee } from "../types/employee";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScheduleEditor } from "./ScheduleEditor";
import { EmployeeOverview } from "./EmployeeOverview";
import { EmployeeEditForm } from "./EmployeeEditForm";

interface EmployeeModalProps {
  employee: Employee | null;
  onClose: () => void;
  onUpdateEmployee?: (employee: Employee) => void;
}

export const EmployeeModal = ({
  employee,
  onClose,
  onUpdateEmployee,
}: EmployeeModalProps) => {
  if (!employee) return null;

  const handleEmployeeUpdate = (updatedEmployee: Employee) => {
    if (onUpdateEmployee) {
      onUpdateEmployee(updatedEmployee);
    }
  };

  return (
    <Dialog open={!!employee} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Employee Details</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="edit">Edit Details</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <EmployeeOverview employee={employee} />
          </TabsContent>
          <TabsContent value="edit">
            <EmployeeEditForm employee={employee} onUpdate={handleEmployeeUpdate} />
          </TabsContent>
          <TabsContent value="schedule">
            <ScheduleEditor
              shifts={employee.shifts || []}
              onSave={(newShifts) => handleEmployeeUpdate({ ...employee, shifts: newShifts })}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};