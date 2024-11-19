export type UserStatus = "registered" | "pending";

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: UserStatus;
  avatar?: string;
  invitedAt?: Date;
  isOnline: boolean;
  lastActive?: Date;
}

export interface AccessLevel {
  id: number;
  name: string;
  canViewUsers: boolean;
  canEditUsers: boolean;
  canDeleteUsers: boolean;
  canInviteUsers: boolean;
  canManageRoles: boolean;
}
