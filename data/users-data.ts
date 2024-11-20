import type { AccessLevel, User } from "@/types/user.types";

export const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@acp-global.net",
    role: "Admin",
    status: "registered",
    isOnline: true,
    lastActive: new Date(),
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@acp-global.net",
    role: "Manager",
    status: "registered",
    isOnline: false,
    lastActive: new Date(Date.now() - 3600000),
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob.johnson@acp-global.net",
    role: "User",
    status: "pending",
    isOnline: false,
    invitedAt: new Date(Date.now() - 86400000),
  },
  {
    id: 4,
    name: "Max Mustermann",
    email: "max.mustermann@acp-global.net",
    role: "User",
    status: "registered",
    isOnline: true,
    avatar: "",
    lastActive: new Date(),
  },
];

export const accessLevels: AccessLevel[] = [
  {
    id: 1,
    name: "Admin",
    canViewUsers: true,
    canEditUsers: true,
    canDeleteUsers: true,
    canInviteUsers: true,
    canManageRoles: true,
  },
  {
    id: 2,
    name: "Manager",
    canViewUsers: true,
    canEditUsers: true,
    canDeleteUsers: false,
    canInviteUsers: true,
    canManageRoles: false,
  },
  {
    id: 3,
    name: "User",
    canViewUsers: true,
    canEditUsers: false,
    canDeleteUsers: false,
    canInviteUsers: false,
    canManageRoles: false,
  },
];
