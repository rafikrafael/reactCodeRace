import React from "react";
import PropTypes from "prop-types";
import { useJogoContext } from "contexts/JogoContext";
import JogoVoltasContainer from "./JogoVoltasContainer";

function JogoVoltas() {
  const { tempos = [], jogoIniciado, aguardarContagem } = useJogoContext();

  return !aguardarContagem && jogoIniciado === true ? (
    <JogoVoltasContainer>
      <h2 className="title">Voltas</h2>
      {tempos.map((tempo, index) => (
        <div key={index} className="item-container">
          <div className="item-volta">{Number(index) + 1}</div>
          <div className="item-tempo">{Number(tempo).toFixed(2)}s</div>
        </div>
      ))}
    </JogoVoltasContainer>
  ) : null;
}

JogoVoltas.propTypes = {};

export default JogoVoltas;
