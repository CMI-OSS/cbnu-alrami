import { useState } from "react";

export type UseModalReturn = {
  isOpen: boolean;
  handleModalClose: () => void;
  handleModalOpen: () => void;
};

function useModal(): UseModalReturn {
  const [ isOpen, setIsOpen ] = useState(false);

  const handleModalOpen = () => {
    return setIsOpen(true);
  };

  const handleModalClose = () => {
    return setIsOpen(false);
  };

  return {
    isOpen,
    handleModalClose,
    handleModalOpen,
  };
}

export default useModal;
