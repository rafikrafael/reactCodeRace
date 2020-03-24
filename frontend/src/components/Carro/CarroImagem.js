import styled from "styled-components";
import carroImg from "assets/img/carro.png";
import carroTurboImg from "assets/img/carroTurbo.png";

const CarroContainer = styled.div`
  position: absolute;
  bottom: 20px;
  width: 30%;
  height: 30%;
  transform: translate(-50%, -50%);
  left: 50%;
  background: url(${({ turboAtivo }) =>
      turboAtivo === true ? carroTurboImg : carroImg})
    no-repeat;
  background-position: center;
  background-size: 100% 100%;

  transform: translateX(${(props) => props.posicao}%);
  &.turbo-ativo {
    animation: turboAtivo 6s linear infinite;
    animation-play-state: ${({ pause }) =>
      pause === true ? "paused" : "running"};
  }
  @keyframes turboAtivo {
    0% {
      bottom: 20px;
      width: 30%;
      height: 30%;
    }
    50% {
      bottom: 240px;
      width: 15%;
      height: 15%;
    }
    100% {
      bottom: 20px;
      width: 30%;
      height: 30%;
    }
  }
`;

export default CarroContainer;
