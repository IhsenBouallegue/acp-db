import { create } from "zustand";

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

type AccessLevel = {
  id: string;
  name: string;
  canViewUsers: boolean;
  canEditUsers: boolean;
  canDeleteUsers: boolean;
  canInviteUsers: boolean;
  canManageRoles: boolean;
};

type UserStore = {
  users: User[];
  roles: AccessLevel[];
  updateUser: (user: User) => void;
  deleteUser: (id: string) => void;
  inviteUser: (email: string, role: string) => void;
  resendInvitation: (id: string) => void;
  setUserOnline: (id: string, isOnline: boolean) => void;
  addRole: (role: AccessLevel) => void;
  updateRole: (role: AccessLevel) => void;
  deleteRole: (id: string) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  users: [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@acp-global.net",
      role: "Admin",
      status: "registered",
      isOnline: true,
      lastActive: new Date(),
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@acp-global.net",
      role: "Manager",
      status: "registered",
      isOnline: false,
      lastActive: new Date(Date.now() - 3600000),
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob.johnson@acp-global.net",
      role: "User",
      status: "pending",
      isOnline: false,
      invitedAt: new Date(Date.now() - 86400000),
    },
  ],
  roles: [
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
  ],
  updateUser: (updatedUser) =>
    set((state) => ({
      users: state.users.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
    })),
  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    })),
  inviteUser: (email, role) =>
    set((state) => ({
      users: [
        ...state.users,
        {
          id: Date.now().toString(),
          name: "",
          email,
          role,
          status: "pending",
          invitedAt: new Date(),
          isOnline: false,
        },
      ],
    })),
  resendInvitation: (id) =>
    set((state) => ({
      users: state.users.map((user) => (user.id === id ? { ...user, invitedAt: new Date() } : user)),
    })),
  setUserOnline: (id, isOnline) =>
    set((state) => ({
      users: state.users.map((user) => (user.id === id ? { ...user, isOnline, lastActive: new Date() } : user)),
    })),
  addRole: (newRole) =>
    set((state) => ({
      roles: [...state.roles, newRole],
    })),
  updateRole: (updatedRole) =>
    set((state) => ({
      roles: state.roles.map((role) => (role.id === updatedRole.id ? updatedRole : role)),
    })),
  deleteRole: (id) =>
    set((state) => ({
      roles: state.roles.filter((role) => role.id !== id),
    })),
}));
