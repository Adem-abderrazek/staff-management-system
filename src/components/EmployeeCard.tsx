import { Employee } from "../types/employee";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Archive, Trash2, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const roleColors = {
  manager: "bg-blue-100 text-blue-800 border-blue-200",
  chef: "bg-orange-100 text-orange-800 border-orange-200",
  waiter: "bg-green-100 text-green-800 border-green-200",
  cashier: "bg-purple-100 text-purple-800 border-purple-200",
  other: "bg-gray-100 text-gray-800 border-gray-200",
};

interface EmployeeCardProps {
  employee: Employee;
  onClick: (employee: Employee) => void;
  onArchive?: (employee: Employee, reason: string) => void;
  onUnarchive?: (employee: Employee) => void;
  onDelete?: (employee: Employee) => void;
  variant?: "default" | "archived";
}

export const EmployeeCard = ({ 
  employee, 
  onClick, 
  onArchive,
  onUnarchive,
  onDelete,
  variant = "default" 
}: EmployeeCardProps) => {
  const [archiveReason, setArchiveReason] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <Card className={`p-6 hover:shadow-lg transition-all duration-200 cursor-pointer ${
      variant === "archived" ? "opacity-75 bg-gray-50" : ""
    }`}>
      <div className="flex items-center space-x-4 mb-4">
        <div className="relative">
          <img
            src={employee.avatar}
            alt={`${employee.firstName} ${employee.lastName}`}
            className="w-16 h-16 rounded-full border-2 border-gray-200"
          />
          <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
            variant === "archived" ? "bg-gray-400" : "bg-green-400"
          }`} />
        </div>
        <div className="flex-1" onClick={() => onClick(employee)}>
          <h3 className="font-semibold text-lg">
            {employee.firstName} {employee.lastName}
          </h3>
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${
              roleColors[employee.role]
            }`}
          >
            {employee.role.charAt(0).toUpperCase() + employee.role.slice(1)}
          </span>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Hours Worked</p>
          <p className="text-xl font-bold">{employee.hoursWorked}h</p>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Performance</span>
            <span className="font-medium">{employee.performance}%</span>
          </div>
          <Progress value={employee.performance} className="h-2" />
        </div>
        {variant === "default" && onArchive && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="w-full" size="sm">
                <Archive className="w-4 h-4 mr-2" />
                Archive Employee
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Archive Employee</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to archive this employee? This action can be reversed later.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="py-4">
                <Label htmlFor="reason">Reason for archiving</Label>
                <Input
                  id="reason"
                  placeholder="Enter the reason..."
                  value={archiveReason}
                  onChange={(e) => setArchiveReason(e.target.value)}
                />
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    if (archiveReason.trim() && onArchive) {
                      onArchive(employee, archiveReason);
                      setArchiveReason("");
                    }
                  }}
                >
                  Archive
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        {variant === "archived" && (
          <div className="flex gap-2">
            {onUnarchive && (
              <Button 
                variant="outline" 
                className="flex-1" 
                size="sm"
                onClick={() => onUnarchive(employee)}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Unarchive
              </Button>
            )}
            {onDelete && (
              <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="destructive" 
                    className="flex-1" 
                    size="sm"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Employee</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to permanently delete this employee? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        onDelete(employee);
                        setShowDeleteConfirm(false);
                      }}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};