import { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import { useLocation } from "react-router-dom";

const useGA = () => {
  const location = useLocation();
  const [ initialized, setInitialized ] = useState(false);

  useEffect(() => {
    ReactGA.initialize("G-90WFEB8J9K");

    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      ReactGA.send({
        hitType: "pageview",
        page: location.pathname + location.search,
      });
    }
  }, [ initialized, location ]);
};

export default useGA;
