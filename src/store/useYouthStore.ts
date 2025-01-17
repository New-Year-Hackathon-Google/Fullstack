import { create } from 'zustand';

interface YouthData {
  name: string;
  skills: string;
  location: string;
  availability: string;
  setYouthData: (data: Partial<YouthData>) => void;
}

const useYouthStore = create<YouthData>((set) => ({
  name: '',
  skills: '',
  location: '',
  availability: '',
  setYouthData: (data) =>
    set((state) => ({
      ...state,
      ...data,
    })),
}));

export default useYouthStore;
