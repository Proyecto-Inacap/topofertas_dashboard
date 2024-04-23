import { create } from "zustand";

interface CategoryModalState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useCategoryModal = create<CategoryModalState>((set) => ({
    isOpen: false,
    setIsOpen: (isOpen) => set({ isOpen }),
}));
