import { create } from 'zustand';
import type { LanguageCode } from '../constants/translations';

interface AppStore {
  theme: 'light' | 'dark' | 'auto';
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeWard: string | null;
  setActiveWard: (wardId: string | null) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  theme: 'auto',
  setTheme: (theme) => set({ theme }),
  language: 'en',
  setLanguage: (language) => set({ language }),
  sidebarOpen: false,
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  activeWard: null,
  setActiveWard: (activeWard) => set({ activeWard }),
}));
