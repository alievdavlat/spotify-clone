import { create } from "zustand";

interface LoaderProps {
  isOpen:boolean
  onOpen :() => void
  onClose :() => void
}


const useLoader = create<LoaderProps>((set) => ({
  isOpen:false,
  onOpen:() => set({isOpen:true}),
  onClose:() => set({isOpen:false})
  }))


export default useLoader
