"use client";

import { RoleManagement } from "@/app/user-management/role-management";
import UserList from "@/app/user-management/user-list";
import { PageContainer } from "@/components/ui/page-container";
import { TooltipProvider } from "@/components/ui/tooltip";
import { InviteUser } from "./invite-user";

export default function UserManagementPage() {
  return (
    <TooltipProvider>
      <PageContainer>
        <InviteUser />
        <UserList />
        <RoleManagement />
      </PageContainer>
    </TooltipProvider>
  );
}
