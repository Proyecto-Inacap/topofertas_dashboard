import { create } from "zustand";

interface UserModalState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useUserModal = create<UserModalState>((set) => ({
    isOpen: false,
    setIsOpen: (isOpen) => set({ isOpen }),
}));
