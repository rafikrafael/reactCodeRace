import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import JogoPista from "./JogoPista";
import JogoCarro from "./JogoCarro";
import Contagem from "./Contagem/index";
import IniciarJogo from "./IniciarJogo";
import MenuPause from "./MenuPause";
import ContagemTurbo from "./ContagemTurbo";
import JogoLinhaChegada from "./JogoLinhaChegada";
import JogoVoltas from "./JogoVoltas/JogoVoltas";
import MenuFimCorrida from "./MenuFimCorrida";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: relative;
  overflow: hidden;
`;

function Jogo() {
  return (
    <Container>
      <JogoPista />

      <JogoCarro />

      <Contagem />
      <ContagemTurbo />
      <JogoLinhaChegada />
      <JogoVoltas />

      <IniciarJogo />

      <MenuPause />
      <MenuFimCorrida />
    </Container>
  );
}

Jogo.propTypes = {};

export default Jogo;
