import React from "react";
import PropTypes from "prop-types";

export default function useInterval(callback, delay = null) {
  const savedCallback = React.useRef();
  // Remember the latest function.
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  React.useEffect(() => {
    function tick() {
      if (savedCallback.current) savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

useInterval.propTypes = {
  callback: PropTypes.func,
  delay: PropTypes.number
};
