import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useJogoContext } from "contexts/JogoContext";
import MenuCenter from "components/ContainerCenter/MenuCenter";
import Leaderboard from "../Leaderboard";

const CompsContainers = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const JogadorInput = styled(TextField).attrs({
  fullWidth: true,
  InputProps: {
    disableUnderline: true,
  },
})`
  .MuiInput-input {
    text-align: center;
    color: #000;
    font-size: 20px;
  }
`;

function IniciarJogo() {
  const [nomeJogador, setNomeJogador] = React.useState("");
  const { jogoIniciado = false, iniciaJogo, tempos } = useJogoContext();
  const [openBoard, setOpenBoard] = React.useState(false);

  const handleOnChangeNomeJogador = (e) => setNomeJogador(e.target.value);
  const handleComecar = (e) => {
    e.preventDefault();
    iniciaJogo(nomeJogador);
    setNomeJogador("");
  };

  const handleAbrirLeaderboard = () => setOpenBoard((value) => !value);

  return jogoIniciado === true || tempos.length > 0 ? null : (
    <MenuCenter title="Bem vindo ao CodRace">
      <CompsContainers>
        <JogadorInput
          placeholder="Informe o nome do Jogador"
          value={nomeJogador}
          onChange={handleOnChangeNomeJogador}
        />
      </CompsContainers>
      <CompsContainers>
        <Button
          fullWidth
          color="primary"
          variant="contained"
          disabled={!nomeJogador || String(nomeJogador).length < 3}
          onClick={handleComecar}
        >
          Iniciar a Corrida
        </Button>
      </CompsContainers>
      <CompsContainers>
        <Button
          fullWidth
          color="primary"
          variant="contained"
          onClick={handleAbrirLeaderboard}
        >
          Abrir Leaderboard
        </Button>
      </CompsContainers>
      <Leaderboard isVisible={openBoard} onClose={handleAbrirLeaderboard} />
    </MenuCenter>
  );
}

IniciarJogo.propTypes = {};

export default IniciarJogo;
