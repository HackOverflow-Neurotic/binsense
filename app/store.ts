import { create } from "zustand";

type IPStore = {
    ip: string;
  setIP: (value:string) => void;
  port: string;
  setPort: (value:string) => void;
    role: 'camera' | 'device' | '';
    setRole: (value:'camera' | 'device' | '') => void;
  cameraOpen: boolean;
  setCameraOpen: () => void;
};

export const useIPStore = create<IPStore>((set) => {
    return {
      ip: '0.0.0.0',
      setIP: (value) => set((state) => ({ ip: value })),
      port: '5000',
      setPort: (value) => set((state) => ({ port: value })),
      role: '',
      setRole: (value) => set((state) => ({role: value})),
      cameraOpen: true,
      setCameraOpen: () => set((state) => ({cameraOpen: !state.cameraOpen})),
    };
  });