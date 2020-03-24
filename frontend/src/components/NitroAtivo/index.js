import styled from "styled-components";
import nitroAtivo from "assets/img/nitroAtivo.png";

const NitroAtivo = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: url(${nitroAtivo}) no-repeat;
  background-position: center;
  background-size: 15% 15%;
  top: 20%;
  left: 10%;
`;

export default NitroAtivo;
