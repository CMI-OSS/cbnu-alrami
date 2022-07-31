import { useEffect, useState } from "react";

const useScroll = () => {
  const [ position, setPosition ] = useState({
    X: 0,
    Y: 0,
  });
  const onScroll = () => {
    setPosition({
      X: window.scrollX,
      Y: window.scrollY,
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return position;
};

export default useScroll;
