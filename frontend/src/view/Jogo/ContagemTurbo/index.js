import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import blue from "@material-ui/core/colors/blue";
import ReactCountdownClock from "react-countdown-clock";

import { useJogoContext } from "contexts/JogoContext";
import NitroAtivo from "components/NitroAtivo";

const ContagemContainer = styled.div`
  position: absolute;
  top: 20%;
  left: 5%;

  .title {
    background-color: rgba(0, 0, 0, 0.4);
    text-aling: center;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
  }
`;

function ContagemTurbo() {
  const {
    jogoIniciado,
    jogoPausado,
    podeUsarTurbo,
    usarTurbo,
    aguardarContagem,
    liberarUsoTurbo,
  } = useJogoContext();

  const handleLiberaUsoTurbo = () => liberarUsoTurbo(true);

  const isPlaying =
    !aguardarContagem &&
    jogoIniciado === true &&
    !jogoPausado &&
    !podeUsarTurbo &&
    !usarTurbo;
    // return <NitroAtivo />;
  return !usarTurbo &&
    !aguardarContagem &&
    !podeUsarTurbo &&
    jogoIniciado === true ? (
    <ContagemContainer>
      <ReactCountdownClock
        onComplete={handleLiberaUsoTurbo}
        showMilliseconds={false}
        paused={!isPlaying}
        seconds={8}
        color={blue[900]}
        alpha={0.9}
        size={130}
      />
      <div className="title">Carregando Turbo!</div>
    </ContagemContainer>
  ) : !usarTurbo && podeUsarTurbo === true && jogoIniciado === true ? (
    <NitroAtivo />
  ) : null;
}

ContagemTurbo.propTypes = {};

export default ContagemTurbo;
