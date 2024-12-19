import { useState } from "react";
import { employees as initialEmployees } from "../data/mockEmployees";
import { Employee, EmployeeRole } from "../types/employee";
import { EmployeeCard } from "../components/EmployeeCard";
import { EmployeeModal } from "../components/EmployeeModal";
import { AddEmployeeForm } from "../components/AddEmployeeForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { ArrowUpDown, Plus, Archive } from "lucide-react";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useToast } from "../hooks/use-toast";

const Index = () => {
  const [sortBy, setSortBy] = useState<"hours" | "name">("hours");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedRole, setSelectedRole] = useState<EmployeeRole | "all">("all");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [employeesList, setEmployeesList] = useState<Employee[]>(initialEmployees);
  const [archivedEmployees, setArchivedEmployees] = useState<Array<Employee & { archiveReason?: string }>>([]);
  const [activeTab, setActiveTab] = useState("active");
  const { toast } = useToast();

  const sortedAndFilteredEmployees = [...employeesList]
    .filter((emp) => selectedRole === "all" || emp.role === selectedRole)
    .sort((a, b) => {
      if (sortBy === "hours") {
        return sortOrder === "asc"
          ? a.hoursWorked - b.hoursWorked
          : b.hoursWorked - a.hoursWorked;
      } else {
        return sortOrder === "asc"
          ? `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`)
          : `${b.firstName} ${b.lastName}`.localeCompare(`${a.firstName} ${a.lastName}`);
      }
    });

  const toggleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleAddEmployee = (newEmployee: Partial<Employee>) => {
    const employee: Employee = {
      id: crypto.randomUUID(),
      firstName: newEmployee.firstName || "",
      lastName: newEmployee.lastName || "",
      role: newEmployee.role || "other",
      hourlyRate: newEmployee.hourlyRate || 0,
      hoursWorked: 0,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newEmployee.firstName}`,
      performance: 100,
      monthlyPayment: 0,
      email: newEmployee.email || "",
      phone: newEmployee.phone || "",
      shifts: [],
    };
    setEmployeesList([...employeesList, employee]);
    toast({
      title: "Employee Added",
      description: `${employee.firstName} ${employee.lastName} has been added to the team.`,
    });
  };

  const handleUpdateEmployee = (updatedEmployee: Employee) => {
    setEmployeesList(
      employeesList.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
    setSelectedEmployee(updatedEmployee);
  };

  const handleArchiveEmployee = (employee: Employee, reason: string) => {
    setEmployeesList(employeesList.filter((emp) => emp.id !== employee.id));
    setArchivedEmployees([...archivedEmployees, { ...employee, archiveReason: reason }]);
    toast({
      title: "Employee Archived",
      description: `${employee.firstName} ${employee.lastName} has been archived.`,
    });
  };

  const handleUnarchiveEmployee = (employee: Employee) => {
    setArchivedEmployees(archivedEmployees.filter((emp) => emp.id !== employee.id));
    setEmployeesList([...employeesList, employee]);
    toast({
      title: "Employee Restored",
      description: `${employee.firstName} ${employee.lastName} has been restored to active employees.`,
    });
  };

  const handleDeleteEmployee = (employee: Employee) => {
    setArchivedEmployees(archivedEmployees.filter((emp) => emp.id !== employee.id));
    toast({
      title: "Employee Deleted",
      description: `${employee.firstName} ${employee.lastName} has been permanently deleted.`,
      variant: "destructive",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Staff Management</h1>
        <Button onClick={() => setShowAddEmployee(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Employee
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Active Employees</TabsTrigger>
          <TabsTrigger value="archived">
            <Archive className="w-4 h-4 mr-2" />
            Archived Employees
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Select
              value={selectedRole}
              onValueChange={(value) => setSelectedRole(value as EmployeeRole | "all")}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="chef">Chef</SelectItem>
                <SelectItem value="waiter">Waiter</SelectItem>
                <SelectItem value="cashier">Cashier</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={sortBy}
              onValueChange={(value) => setSortBy(value as "hours" | "name")}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hours">Hours Worked</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="icon"
              onClick={toggleSort}
              className="w-10 h-10"
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedAndFilteredEmployees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onClick={setSelectedEmployee}
                onArchive={handleArchiveEmployee}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="archived">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {archivedEmployees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onClick={setSelectedEmployee}
                variant="archived"
                onUnarchive={handleUnarchiveEmployee}
                onDelete={handleDeleteEmployee}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <EmployeeModal
        employee={selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
        onUpdateEmployee={handleUpdateEmployee}
      />

      <AddEmployeeForm
        open={showAddEmployee}
        onClose={() => setShowAddEmployee(false)}
        onSubmit={handleAddEmployee}
      />
    </div>
  );
};

export default Index;