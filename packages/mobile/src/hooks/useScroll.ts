import { useEffect, useState } from "react";

const useScroll = () => {
  const [ position, setPosition ] = useState({
    x: 0,
    y: 0,
  });
  const onScroll = () => {
    setPosition({
      x: window.scrollX,
      y: window.scrollY,
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
