import { Employee } from "../types/employee";

export const employees: Employee[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Smith",
    role: "manager",
    hourlyRate: 25,
    hoursWorked: 160,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    performance: 95,
    monthlyPayment: 4000,
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    shifts: [],
  },
  {
    id: "2",
    firstName: "Maria",
    lastName: "Garcia",
    role: "chef",
    hourlyRate: 22,
    hoursWorked: 155,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    performance: 90,
    monthlyPayment: 3410,
    email: "maria.garcia@example.com",
    phone: "+1 (555) 234-5678",
    shifts: [],
  },
  {
    id: "3",
    firstName: "James",
    lastName: "Wilson",
    role: "waiter",
    hourlyRate: 15,
    hoursWorked: 120,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    performance: 88,
    monthlyPayment: 1800,
    email: "james.wilson@example.com",
    phone: "+1 (555) 345-6789",
    shifts: [],
  },
  {
    id: "4",
    firstName: "Sarah",
    lastName: "Johnson",
    role: "cashier",
    hourlyRate: 16,
    hoursWorked: 140,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    performance: 92,
    monthlyPayment: 2240,
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 456-7890",
    shifts: [],
  },
  {
    id: "5",
    firstName: "David",
    lastName: "Brown",
    role: "other",
    hourlyRate: 14,
    hoursWorked: 100,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    performance: 85,
    monthlyPayment: 1400,
    email: "david.brown@example.com",
    phone: "+1 (555) 567-8901",
    shifts: [],
  },
];