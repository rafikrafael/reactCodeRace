import React from "react";
import PropTypes from "prop-types";
import PistaContainer from "components/Pista/PistaContainer";
import PistaImagem from "components/Pista/PistaImagem";
import { useJogoContext } from "contexts/JogoContext";

function JogoPista() {
  const {
    aguardarContagem = true,
    jogoIniciado = false,
    jogoPausado = false,
  } = useJogoContext();

  const imagemAtiva = React.useMemo(
    () => !aguardarContagem && jogoIniciado === true && !jogoPausado,
    [aguardarContagem, jogoIniciado, jogoPausado]
  );
  return (
    <PistaContainer>
      <PistaImagem imagemAtiva={imagemAtiva}></PistaImagem>
    </PistaContainer>
  );
}

JogoPista.propTypes = {};

export default JogoPista;
