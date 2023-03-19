import { useEffect } from "react";

const useFCMToken = () => {
  useEffect(() => {
    const handler = () => {
      const token = localStorage.getItem("TOKEN");

      if (token) {
        console.log(token);
      } else {
        setTimeout(handler, 1000);
      }
    };

    setTimeout(handler, 1000);
  }, []);
};

export default useFCMToken;
