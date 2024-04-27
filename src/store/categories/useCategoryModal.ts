import { Category } from '@/core/categories/types';
import { create } from "zustand";

interface CategoryModalState {
  createIsOpen: boolean;
  setCreateIsOpen: (createIsOpen: boolean) => void;
  updateIsOpen: Category | null;
  setUpdateIsOpen: (updateIsOpen: Category | null) => void;
}

export const useCategoryModal = create<CategoryModalState>((set) => ({
  createIsOpen: false,
  setCreateIsOpen: (createIsOpen) => set({ createIsOpen }),
  updateIsOpen: null,
  setUpdateIsOpen: (updateIsOpen) => set({ updateIsOpen }),
}));
