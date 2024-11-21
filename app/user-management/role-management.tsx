"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

type AccessLevel = {
  id: string;
  name: string;
  canViewUsers: boolean;
  canEditUsers: boolean;
  canDeleteUsers: boolean;
  canInviteUsers: boolean;
  canManageRoles: boolean;
};

const initialAccessLevels: AccessLevel[] = [
  {
    id: "1",
    name: "Admin",
    canViewUsers: true,
    canEditUsers: true,
    canDeleteUsers: true,
    canInviteUsers: true,
    canManageRoles: true,
  },
  {
    id: "2",
    name: "Manager",
    canViewUsers: true,
    canEditUsers: true,
    canDeleteUsers: false,
    canInviteUsers: true,
    canManageRoles: false,
  },
  {
    id: "3",
    name: "User",
    canViewUsers: true,
    canEditUsers: false,
    canDeleteUsers: false,
    canInviteUsers: false,
    canManageRoles: false,
  },
];

export function RoleManagement() {
  const [accessLevels, setAccessLevels] = useState<AccessLevel[]>(initialAccessLevels);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [currentAccessLevel, setCurrentAccessLevel] = useState<AccessLevel | null>(null);
  const [newAccessLevel, setNewAccessLevel] = useState<AccessLevel>({
    id: "",
    name: "",
    canViewUsers: false,
    canEditUsers: false,
    canDeleteUsers: false,
    canInviteUsers: false,
    canManageRoles: false,
  });

  const handleUpdateAccessLevel = () => {
    if (currentAccessLevel) {
      setAccessLevels(accessLevels.map((level) => (level.id === currentAccessLevel.id ? currentAccessLevel : level)));
      setIsEditDialogOpen(false);
    }
  };

  const handleAddAccessLevel = () => {
    setAccessLevels([...accessLevels, { ...newAccessLevel, id: Date.now().toString() }]);
    setIsAddDialogOpen(false);
    setNewAccessLevel({
      id: "",
      name: "",
      canViewUsers: false,
      canEditUsers: false,
      canDeleteUsers: false,
      canInviteUsers: false,
      canManageRoles: false,
    });
  };

  const handleDeleteAccessLevel = (id: string) => {
    setAccessLevels(accessLevels.filter((level) => level.id !== id));
  };

  return (
    <Card className="border-0 shadow-none md:border md:shadow-sm">
      <CardHeader className="px-0 md:px-6">
        <CardTitle>Role Management</CardTitle>
        <CardDescription>
          Manage access levels and permissions for different roles in your organization.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0 md:px-6">
        <div className="mb-4">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Role
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Role</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="add-name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="add-name"
                    value={newAccessLevel.name}
                    onChange={(e) => setNewAccessLevel({ ...newAccessLevel, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                {Object.entries(newAccessLevel).map(([key, value]) => {
                  if (typeof value === "boolean") {
                    return (
                      <div key={key} className="flex items-center space-x-2">
                        <Checkbox
                          id={`add-${key}`}
                          checked={value}
                          onCheckedChange={(checked) => setNewAccessLevel({ ...newAccessLevel, [key]: checked })}
                        />
                        <label
                          htmlFor={`add-${key}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                        </label>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
              <Button onClick={handleAddAccessLevel}>Add Role</Button>
            </DialogContent>
          </Dialog>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role Name</TableHead>
                <TableHead>View Users</TableHead>
                <TableHead>Edit Users</TableHead>
                <TableHead>Delete Users</TableHead>
                <TableHead>Invite Users</TableHead>
                <TableHead>Manage Roles</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accessLevels.map((level) => (
                <TableRow key={level.id}>
                  <TableCell>{level.name}</TableCell>
                  <TableCell>{level.canViewUsers ? "✓" : "✗"}</TableCell>
                  <TableCell>{level.canEditUsers ? "✓" : "✗"}</TableCell>
                  <TableCell>{level.canDeleteUsers ? "✓" : "✗"}</TableCell>
                  <TableCell>{level.canInviteUsers ? "✓" : "✗"}</TableCell>
                  <TableCell>{level.canManageRoles ? "✓" : "✗"}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setCurrentAccessLevel(level);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteAccessLevel(level.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Role</DialogTitle>
            </DialogHeader>
            {currentAccessLevel && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="edit-name"
                    value={currentAccessLevel.name}
                    onChange={(e) => setCurrentAccessLevel({ ...currentAccessLevel, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                {Object.entries(currentAccessLevel).map(([key, value]) => {
                  if (typeof value === "boolean") {
                    return (
                      <div key={key} className="flex items-center space-x-2">
                        <Checkbox
                          id={`edit-${key}`}
                          checked={value}
                          onCheckedChange={(checked) =>
                            setCurrentAccessLevel({ ...currentAccessLevel, [key]: checked })
                          }
                        />
                        <label
                          htmlFor={`edit-${key}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                        </label>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            )}
            <Button onClick={handleUpdateAccessLevel}>Update Role</Button>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
