import styled from "styled-components";
const JogoVoltasContainer = styled.div`
  position: absolute;
  height: auto;
  background-color: rgba(0, 0, 0, 0.4);
  min-width: 200px;
  right: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .title {
    color: #fff;
    border-bottom: 1px solid #fff;
    text-align: center;
  }

  .item-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
  }

  .item-volta {
    flex: 0.5;
    color: #fff;
    border-right: 1px solid #fff
  }

  .item-tempo {
    flex: 0.5;
    color: #fff;
  }
`;

export default JogoVoltasContainer;
