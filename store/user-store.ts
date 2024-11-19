import { accessLevels, users } from "@/data/users-data";
import type { AccessLevel, User } from "@/types/user.types";
import { create } from "zustand";

type UserStore = {
  users: User[];
  roles: AccessLevel[];
  updateUser: (user: User) => void;
  deleteUser: (id: number) => void;
  inviteUser: (email: string, role: string) => void;
  resendInvitation: (id: number) => void;
  setUserOnline: (id: number, isOnline: boolean) => void;
  addRole: (role: AccessLevel) => void;
  updateRole: (role: AccessLevel) => void;
  deleteRole: (id: number) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  users: users,
  roles: accessLevels,
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
          id: Date.now(),
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
