export type EmployeeRole = "manager" | "chef" | "waiter" | "cashier" | "other";

export type Shift = {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  employeeId: string;
};

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: EmployeeRole;
  hourlyRate: number;
  hoursWorked: number;
  avatar: string;
  performance: number; // 0-100
  monthlyPayment: number;
  shifts: Shift[];
}