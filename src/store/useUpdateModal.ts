import { create } from "zustand";

interface UpdateModalState {
  createIsOpen: boolean;
  setCreateIsOpen: (isOpen: boolean) => void;
  updateIsOpen: Object | null;
  setUpdateIsOpen: (isOpen: Object | null) => void;
}

export const useUpdateModal = create<UpdateModalState>((set) => ({
  createIsOpen: false,
  setCreateIsOpen: (createIsOpen) => set({ createIsOpen }),
  updateIsOpen: null,
  setUpdateIsOpen: (updateIsOpen) => set({ updateIsOpen }),
}));
