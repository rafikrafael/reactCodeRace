import styled from "styled-components";
import banderiasChegada from "assets/img/bandeirasChegada.gif";

const BandeiraChegada = styled.div`
  position: absolute;
  ${'' /* bottom: 20px; */}
  width: 30%;
  height: 180px;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 15%;

  background: url(${banderiasChegada}) no-repeat;
  background-position: center;
  background-size: auto 100%;
  display: ${({ mostrarBandeira }) => mostrarBandeira};
  }
`;

export default BandeiraChegada;
