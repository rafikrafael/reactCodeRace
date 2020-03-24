import styled from "styled-components";
import linhaChegada from "assets/img/linhaChegada.png";

const LinhaChegada = styled.div`
  position: absolute;
  ${'' /* bottom: 20px; */}
  width: 60%;
  height: 180px;
  transform: translate(-50%, -50%);
  left: 48%;
  top: 45%;

  background: url(${linhaChegada}) no-repeat;
  background-position: center;
  background-size: auto 100%;
  display: ${({ mostrarBandeira }) => mostrarBandeira}};

  animation: bandeiraChegando 1.5s linear;
  animation-play-state: ${({ pause }) =>
    pause === true ? "paused" : "running"};
  @keyframes bandeiraChegando {
    0% {
      background-size: 50% 100%;
    }
    25% {
      background-size: 80% 100%;
    }
    40% {
      background-size: 100% 100%;
    }
    60% {
      background-size: 110% 100%;
    }
    75% {
      background-size: 120% 100%;
    }
    100% {
      top: 20%;
      left: 10%;
      
      background-size: 130% 100%;
      transform: scale(10);
    }
  }
`;

export default LinhaChegada;
