import React from "react";
import PropTypes from "prop-types";
import { useJogoContext } from "contexts/JogoContext";
import Button from "@material-ui/core/Button";
import ContainerCenter from "components/ContainerCenter/ContainerCenter";
import styled from "styled-components";
import MenuCenter from "components/ContainerCenter/MenuCenter";

const ButtonContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;

function MenuPause() {
  const { jogoPausado, pausaJogo, pararJogo } = useJogoContext();

  return jogoPausado ? (
    <MenuCenter title="CodRace">
      <ButtonContainer>
        <Button fullWidth color="primary" variant="contained" onClick={pausaJogo}>
          Voltar
        </Button>
      </ButtonContainer>

      <ButtonContainer>
        <Button fullWidth color="primary" variant="contained" onClick={pararJogo}>
          Sair da Partida
        </Button>
      </ButtonContainer>
    </MenuCenter>
  ) : null;
}

MenuPause.propTypes = {};

export default MenuPause;
