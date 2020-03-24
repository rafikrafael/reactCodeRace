import React from "react";
import PropTypes from "prop-types";
import green from "@material-ui/core/colors/green"
import ReactCountdownClock from "react-countdown-clock";
import { useJogoContext } from "contexts/JogoContext";
import ContainerCenter from "components/ContainerCenter/ContainerCenter";

function Contagem() {
  const { aguardarContagem, jogoRemoverContagem } = useJogoContext();

  return aguardarContagem === true ? (
    <ContainerCenter>
      <ReactCountdownClock
        showMilliseconds={false}
        onComplete={jogoRemoverContagem}
        paused={!aguardarContagem}
        seconds={3}
        color={green[900]}
        alpha={0.9}
        size={250}
      />
    </ContainerCenter>
  ) : null;
}

Contagem.propTypes = {};

export default Contagem;
