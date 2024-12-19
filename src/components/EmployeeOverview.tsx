import { Employee } from "../types/employee";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface EmployeeOverviewProps {
  employee: Employee;
}

export const EmployeeOverview = ({ employee }: EmployeeOverviewProps) => {
  const hoursData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    hours: Math.floor(Math.random() * 8) + 4,
  }));

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <img
          src={employee.avatar}
          alt={`${employee.firstName} ${employee.lastName}`}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h3 className="font-semibold text-lg">
            {employee.firstName} {employee.lastName}
          </h3>
          <p className="text-gray-500 capitalize">{employee.role}</p>
        </div>
      </div>
      <Separator />
      <div className="space-y-2">
        <h4 className="font-medium">Contact Information</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <span className="text-gray-500">Email:</span>
          <span>{employee.email}</span>
          <span className="text-gray-500">Phone:</span>
          <span>{employee.phone}</span>
        </div>
      </div>
      <Separator />
      <div className="space-y-2">
        <h4 className="font-medium">Payment Details</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <span className="text-gray-500">Hourly Rate:</span>
          <span>${employee.hourlyRate}/hour</span>
          <span className="text-gray-500">Monthly Payment:</span>
          <span>${employee.monthlyPayment}</span>
          <span className="text-gray-500">Hours Worked:</span>
          <span>{employee.hoursWorked} hours</span>
        </div>
      </div>
      <Separator />
      <div className="space-y-2">
        <h4 className="font-medium">Performance</h4>
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>Overall Performance</span>
            <span>{employee.performance}%</span>
          </div>
          <Progress value={employee.performance} className="h-2" />
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="font-medium">Hours Worked This Month</h4>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={hoursData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="hours"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};