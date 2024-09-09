"use client"
import React from "react";
import Modal from "./Modal";
import useLoader from "@/hooks/useLoader";


const Loader = () => {
  const {isOpen, onClose} = useLoader()
  const onChange  = (open:boolean) => {
    if (!open) {
        onClose()
    }
  }

  return (
    <Modal
    title=''
    description=''
    isOpen={isOpen}
    onChange={onChange}
    >
     <div className="flex flex-row gap-2">
      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
      <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
    </div>
    </Modal>
    
  );
};

export default Loader;
