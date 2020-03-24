import React from "react";
import PropTypes from "prop-types";
import { useJogoContext } from "contexts/JogoContext";
import LinhaChegada from "components/LinhaChegada/LinhaChegada";
import useTimeout from "contexts/TimeoutHandle";

function JogoLinhaChegada() {
  const { jogoIniciado, jogoPausado, tempos = [] } = useJogoContext();
  const [mostrarBandeira, setMostraBandeira] = React.useState("none");

  const escondeLinhaChegada = () => {
    setMostraBandeira("none");
  };
  const { iniciar, isPausado, pausar, continuar } = useTimeout(
    escondeLinhaChegada,
    1.5 * 1000
  );

  React.useEffect(() => {
    if (tempos.length > 0 && jogoIniciado === true) {
      setMostraBandeira("block");
      iniciar();
    } else if (jogoPausado === false && isPausado === true) continuar();
    else if (jogoPausado === true) pausar();
  }, [jogoIniciado, tempos]);

  return <LinhaChegada mostrarBandeira={mostrarBandeira}></LinhaChegada>;
}

JogoLinhaChegada.propTypes = {};

export default JogoLinhaChegada;
