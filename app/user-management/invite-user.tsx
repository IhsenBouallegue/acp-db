"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/store/user-store";
import { UserPlus } from "lucide-react";
import { useState } from "react";

export function InviteUser() {
  const [isOpen, setIsOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const { roles, inviteUser } = useUserStore();
  const [inviteRole, setInviteRole] = useState(roles[0]?.name || "");

  const handleInviteUser = () => {
    inviteUser(inviteEmail, inviteRole);
    setInviteEmail("");
    setInviteRole(roles[0]?.name || "");
    setIsOpen(false);
  };

  return (
    <Card className="border-0 shadow-none md:border md:shadow-sm">
      <CardHeader className="px-0 md:px-6">
        <CardTitle>Invite Team Members</CardTitle>
        <CardDescription>Add new members to your organization by sending email invitations.</CardDescription>
      </CardHeader>
      <CardContent className="px-0 md:px-6">
        <p className="mb-4">
          Invite new team members to join your organization. They will receive an email with instructions to set up
          their account and select their role-specific permissions.
        </p>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
  );
}
