import styled from "styled-components";
import imgCenarioAnimada from "assets/img/cenarioAnimada.gif";
import imgCenarioParada from "assets/img/cenarioParado.gif";

const PistaImagem = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;

  background: url(${(props) =>
    props.imagemAtiva === true ? imgCenarioAnimada : imgCenarioParada});
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
`;

export default PistaImagem;
