import { create } from "zustand";

interface CreateModalState {
  createIsOpen: boolean;
  setCreateIsOpen: (isOpen: boolean) => void;
}

export const useCreateModal = create<CreateModalState>((set) => ({
  createIsOpen: false,
  setCreateIsOpen: (createIsOpen) => set({ createIsOpen }),
}));
