import React from "react";
import PropTypes from "prop-types";
import { useJogoContext } from "contexts/JogoContext";
import CarroImagem from "components/Carro/CarroImagem";

function JogoCarro() {
  const { jogoIniciado, carroPosicao, usarTurbo, jogoPausado } = useJogoContext();
  return (
    <CarroImagem
      posicao={carroPosicao}
      turboAtivo={usarTurbo}
      pause={jogoPausado === true}
      className={`${
        usarTurbo === true && jogoIniciado === true ? "turbo-ativo" : ""
      }`}
    ></CarroImagem>
  );
}

JogoCarro.propTypes = {};

export default JogoCarro;
