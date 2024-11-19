"use client";

import { RoleManagement } from "@/app/user-management/role-management";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useUserStore } from "@/store/user-store";
import { Mail, Pencil, Trash2, UserCheck, UserPlus, UserX } from "lucide-react";
import { useState } from "react";

type UserStatus = "registered" | "pending";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: UserStatus;
  invitedAt?: Date;
  isOnline: boolean;
  lastActive?: Date;
};

export default function UserManagementPage() {
  const { users, roles, updateUser, deleteUser, inviteUser, resendInvitation, setUserOnline } = useUserStore();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState(roles[0]?.name || "");
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  const handleUpdateUser = () => {
    if (currentUser) {
      updateUser(currentUser);
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteUser = () => {
    if (userToDelete) {
      deleteUser(userToDelete);
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const handleInviteUser = () => {
    inviteUser(inviteEmail, inviteRole);
    setInviteEmail("");
    setInviteRole(roles[0]?.name || "");
    setIsInviteDialogOpen(false);
  };

  const getStatusBadge = (status: UserStatus) => {
    switch (status) {
      case "registered":
        return <Badge className="bg-green-500">Registered</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
    }
  };

  const getOnlineStatus = (user: User) => {
    if (user.status !== "registered") {
      return <span className="text-sm text-gray-500">N/A</span>;
    }
    if (user.isOnline) {
      return <Badge className="bg-green-500">Online</Badge>;
    }
    if (user.lastActive) {
      const lastActive = new Date(user.lastActive);
      const now = new Date();
      const diffInHours = (now.getTime() - lastActive.getTime()) / (1000 * 60 * 60);

      if (diffInHours < 1) {
        return <span className="text-sm text-gray-500">Active {Math.round(diffInHours * 60)} min ago</span>;
      }
      if (diffInHours < 24) {
        return <span className="text-sm text-gray-500">Active {Math.round(diffInHours)} hours ago</span>;
      }
      return <span className="text-sm text-gray-500">Active {Math.round(diffInHours / 24)} days ago</span>;
    }
    return <span className="text-sm text-gray-500">Never active</span>;
  };

  return (
    <TooltipProvider>
      <div className="container mx-auto py-10">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage your organization's users, invite new members, and control access.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              This dashboard allows you to oversee all user accounts within your organization. You can invite new users,
              edit existing user information, and manage user roles and statuses.
            </p>
            <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Invite New User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Invite New User</DialogTitle>
                  <DialogDescription>Send an invitation to a new user to join your organization.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="invite-email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="invite-email"
                      type="email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="invite-role" className="text-right">
                      Role
                    </Label>
                    <select
                      id="invite-role"
                      value={inviteRole}
                      onChange={(e) => setInviteRole(e.target.value)}
                      className="col-span-3 p-2 border rounded"
                    >
                      {roles.map((role) => (
                        <option key={role.id} value={role.name}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <Button onClick={handleInviteUser}>Send Invitation</Button>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>User List</CardTitle>
            <CardDescription>A comprehensive list of all users in your organization.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Online Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name || "N/A"}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>{getOnlineStatus(user)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setCurrentUser(user);
                                setIsEditDialogOpen(true);
                              }}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Edit User</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setUserToDelete(user.id);
                                setIsDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Delete User</TooltipContent>
                        </Tooltip>
                        {user.status === "pending" && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={() => resendInvitation(user.id)}>
                                <Mail className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Resend Invitation</TooltipContent>
                          </Tooltip>
                        )}
                        {user.status === "registered" && !user.isOnline && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={() => setUserOnline(user.id, true)}>
                                <UserCheck className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Set User Online</TooltipContent>
                          </Tooltip>
                        )}
                        {user.status === "registered" && user.isOnline && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={() => setUserOnline(user.id, false)}>
                                <UserX className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Set User Offline</TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
            </DialogHeader>
            {currentUser && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="edit-name"
                    value={currentUser.name}
                    onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={currentUser.email}
                    onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-role" className="text-right">
                    Role
                  </Label>
                  <select
                    id="edit-role"
                    value={currentUser.role}
                    onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
                    className="col-span-3 p-2 border rounded"
                  >
                    {roles.map((role) => (
                      <option key={role.id} value={role.name}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-status" className="text-right">
                    Status
                  </Label>
                  <select
                    id="edit-status"
                    value={currentUser.status}
                    onChange={(e) => setCurrentUser({ ...currentUser, status: e.target.value as UserStatus })}
                    className="col-span-3 p-2 border rounded"
                  >
                    <option value="registered">Registered</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
            )}
            <Button onClick={handleUpdateUser}>Update User</Button>
          </DialogContent>
        </Dialog>
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm User Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this user? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteUser}>
                Delete User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div className="mt-8">
          <RoleManagement />
        </div>
      </div>
    </TooltipProvider>
  );
}
