import { create } from 'zustand'

interface Props {
  loadingState: boolean
  setLoadingState: (loadingState: boolean) => void

}

export const useLoadingState = create<Props>((set) => ({
  loadingState: false,
  setLoadingState: (loadingState) => set({ loadingState }),
  
}))