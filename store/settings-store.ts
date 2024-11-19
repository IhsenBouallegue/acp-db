import { create } from "zustand";

interface Settings {
  theme: "light" | "dark" | "system";
  notificationsEnabled: boolean;
  dataRefreshInterval: "realtime" | "hourly" | "daily";
  compactView: boolean;
  autoSave: boolean;
  defaultDashboard: "overview" | "analytics" | "reports";
}

interface SettingsStore {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  settings: {
    theme: "system",
    notificationsEnabled: true,
    dataRefreshInterval: "hourly",
    compactView: false,
    autoSave: true,
    defaultDashboard: "overview",
  },
  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),
}));
