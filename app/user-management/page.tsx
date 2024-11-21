"use client";

import { RoleManagement } from "@/app/user-management/role-management";
import UserList from "@/app/user-management/user-list";
import { PageContainer } from "@/components/ui/page-container";
import { PageHeading } from "@/components/ui/page-heading";
import { PageSubheading } from "@/components/ui/page-subheading";
import { TooltipProvider } from "@/components/ui/tooltip";
import { InviteUser } from "./invite-user";

export default function UserManagementPage() {
  return (
    <TooltipProvider>
      <PageContainer>
        <PageHeading>User Management</PageHeading>
        <PageSubheading>Manage your organization's users, roles, and permissions</PageSubheading>
        <InviteUser />
        <UserList />
        <RoleManagement />
      </PageContainer>
    </TooltipProvider>
  );
}
