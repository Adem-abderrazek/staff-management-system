import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Employee, EmployeeRole } from "../types/employee";

interface AddEmployeeFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (employee: Partial<Employee>) => void;
}

export const AddEmployeeForm = ({ open, onClose, onSubmit }: AddEmployeeFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const employee: Partial<Employee> = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      role: formData.get("role") as EmployeeRole,
      hourlyRate: Number(formData.get("hourlyRate")),
      shifts: [],
    };
    onSubmit(employee);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Input name="firstName" placeholder="First Name" required />
            <Input name="lastName" placeholder="Last Name" required />
            <Input name="email" type="email" placeholder="Email" required />
            <Input name="phone" type="tel" placeholder="Phone" required />
            <Input
              name="hourlyRate"
              type="number"
              placeholder="Hourly Rate"
              min="0"
              step="0.01"
              required
            />
            <Select name="role" required>
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="chef">Chef</SelectItem>
                <SelectItem value="waiter">Waiter</SelectItem>
                <SelectItem value="cashier">Cashier</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Add Employee</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};