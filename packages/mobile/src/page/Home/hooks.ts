import { useState } from "react";

export function useHome() {
  const [ isOpen, setIsOpen ] = useState(false);

  const handleSuggestionClick = () => {
    setIsOpen((open) => {
      return !open;
    });
  };

  return {
    isOpen,
    handleSuggestionClick,
  };
}
