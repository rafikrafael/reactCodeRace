import React from "react";
import PropTypes from "prop-types";
import { useJogoContext } from "contexts/JogoContext";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import MenuCenter from "components/ContainerCenter/MenuCenter";
import { saveToLeaderboard } from "service/leaderboards";

const ButtonContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

function MenuFimCorrida() {
  const {
    nomeJogador,
    iniciaJogo,
    pararJogo,
    tempos,
    jogoIniciado,
  } = useJogoContext();

  const [valorSalvo, setValorSalvo] = React.useState(false);

  const getTempoTotal = () => {
    const valorTotal = tempos.reduce((ac, cv) => {
      return ac + cv;
    }, 0);
    return Number(valorTotal).toFixed(2);
  };

  const handleEnviarDados = async () => {
    const retorno = await saveToLeaderboard({
      nome: nomeJogador,
      tempoTotal: Number(getTempoTotal()),
    });
    if (retorno && retorno.status === true) setValorSalvo(true);
  };

  return !jogoIniciado && tempos.length > 0 ? (
    <MenuCenter title="Fim de Corrida">
      <h4 style={{ textAlign: "center" }}>
        Parabéns {nomeJogador}, o seu tempo total foi de {getTempoTotal()}{" "}
        segundos
      </h4>

      <ButtonContainer>
        <Button
          fullWidth
          disabled={valorSalvo === true}
          color="primary"
          variant="contained"
          onClick={handleEnviarDados}
        >
          Enviar resultado para o Leaderboard
        </Button>
      </ButtonContainer>

      <ButtonContainer>
        <Button
          fullWidth
          color="primary"
          variant="contained"
          onClick={iniciaJogo}
        >
          Nova Partida
        </Button>
      </ButtonContainer>

      <ButtonContainer>
        <Button
          fullWidth
          color="primary"
          variant="contained"
          onClick={pararJogo}
        >
          Voltar para o Menu
        </Button>
      </ButtonContainer>
    </MenuCenter>
  ) : null;
}

MenuFimCorrida.propTypes = {};

export default MenuFimCorrida;
