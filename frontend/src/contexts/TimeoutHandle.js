import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

export default function useTimeout(callback, delay = 1000) {
  const timerId = React.useRef();
  const savedCallback = React.useRef();
  const iniciadoEm = React.useRef();
  const tempoRestante = React.useRef(delay);
  const isPausado = React.useRef(false);

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const calculaDiferencaSegundo = () =>
    Number(delay) - Number(moment(new Date()).diff(iniciadoEm.current));

  const pausar = () => {
    isPausado.current = true;
    clearTimeout(timerId.current);
    tempoRestante.current = calculaDiferencaSegundo();
  };

  const continuar = () => {
    isPausado.current = false;
    iniciadoEm.current = moment(new Date());
    clearTimeout(timerId.current);
    const tick = () => {
      if (savedCallback.current) savedCallback.current();
      // clearTimeout(timerId.current);
      tempoRestante.current = delay;
    };
    timerId.current = setTimeout(tick, tempoRestante.current);
  };

  const iniciar = () => {
    tempoRestante.current = delay;
    continuar();
  };

  React.useEffect(() => {
    return () => clearTimeout(timerId);
  }, []);

  return {
    pausar,
    continuar,
    iniciar,
    isPausado,
  };
}

useTimeout.propTypes = {
  callback: PropTypes.func,
  delay: PropTypes.number,
};
