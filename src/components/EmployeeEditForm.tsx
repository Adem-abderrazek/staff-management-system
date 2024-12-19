import { Employee } from "../types/employee";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";

interface EmployeeEditFormProps {
  employee: Employee;
  onUpdate: (employee: Employee) => void;
}

export const EmployeeEditForm = ({ employee, onUpdate }: EmployeeEditFormProps) => {
  const form = useForm({
    defaultValues: {
      email: employee.email,
      phone: employee.phone,
      hourlyRate: employee.hourlyRate.toString(),
    },
  });

  const onSubmit = (values: any) => {
    const updatedEmployee = {
      ...employee,
      email: values.email,
      phone: values.phone,
      hourlyRate: parseFloat(values.hourlyRate),
    };
    onUpdate(updatedEmployee);
    toast({
      title: "Employee Updated",
      description: "Employee information has been successfully updated.",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input {...field} type="tel" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hourlyRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hourly Rate ($)</FormLabel>
              <FormControl>
                <Input {...field} type="number" step="0.01" min="0" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update Employee</Button>
      </form>
    </Form>
  );
};