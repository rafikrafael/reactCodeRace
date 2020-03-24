import React from "react";
import PropTypes from "prop-types";
import useTimeout from "./TimeoutHandle";
import { jogoActions, jogoReducer, valorInicial } from "./JogoReducer";
import { tempoVoltas, numeroVoltas } from "consts/conts";

export const JogoContext = React.createContext({
  ...valorInicial,
  iniciaJogo: () => {},
  pausaJogo: () => {},
  pararJogo: () => {},
  jogoRemoverContagem: () => {},
  liberarUsoTurbo: () => {},
});

export const useJogoContext = () => React.useContext(JogoContext);

const getNumeroRandomico = (min, max) => {
  return Math.random() * (max - min) + min;
};

const JogoProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(jogoReducer, valorInicial);
  const {
    aguardarContagem,
    jogoIniciado,
    jogoPausado,
    podeUsarTurbo,
    usarTurbo,
    tempos,
  } = state;

  const desativarTurbo = () => {
    dispatch({ type: jogoActions.JOGO_CARRO_TURBO, payload: false });
    const valorPosicaoTurbo = getNumeroRandomico(1, 5);
    dispatch({
      type: jogoActions.JOGO_CARRO_TURBO_POSICAO,
      payload: valorPosicaoTurbo,
    });
  };

  const setNovaVolta = () => {
    dispatch({ type: jogoActions.JOGO_NUMERO_VOLTAS });
    if (tempos.length >= numeroVoltas - 1) {
      dispatch({ type: jogoActions.JOGO_ENCERRAR_VOLTAS });
      tempoTurbo.pausar();
      tempoVolta.pausar();
    } else tempoVolta.iniciar();
  };

  const tempoTurbo = useTimeout(desativarTurbo, 6000);
  const tempoVolta = useTimeout(setNovaVolta, tempoVoltas * 1000);

  const ativaTimerFinalizarTurbo = (action) => {
    if (podeUsarTurbo === true) {
      dispatch({ type: action, payload: true });
      liberarUsoTurbo(false);
      tempoTurbo.iniciar();
    }
  };

  const dispatchPosicaoCarro = (action, callback) => {
    if (aguardarContagem === false && jogoIniciado === true && !jogoPausado) {
      if (callback) return callback(action);
      return dispatch({ type: action });
    }
  };

  const iniciaJogo = (nomeJogador) =>
    dispatch({ type: jogoActions.JOGO_INICIAR, payload: nomeJogador });

  const jogoRemoverContagem = () => {
    dispatch({ type: jogoActions.JOGO_REMOVER_CONTAGEM });
    tempoVolta.iniciar();
  };

  const pausaJogo = () => {
    if (!jogoPausado) {
      tempoVolta.pausar();
      if (usarTurbo === true) tempoTurbo.pausar();
    } else {
      tempoVolta.continuar();
      if (usarTurbo === true) tempoTurbo.continuar();
    }
    dispatch({ type: jogoActions.JOGO_PAUSAR });
  };
  const pararJogo = () => {
    tempoVolta.pausar();
    tempoTurbo.pausar();
    dispatch({ type: jogoActions.JOGO_PARAR });
  };

  const liberarUsoTurbo = (payload) =>
    dispatch({ type: jogoActions.JOGO_CARRO_LIBERAR_TURBO, payload });

  const handleTeclasPosicao = React.useCallback(
    (e) => {
      e.preventDefault();
      switch (e.keyCode) {
        case 65:
        case 37:
          dispatchPosicaoCarro(jogoActions.JOGO_CARRO_ESQUERDA);
          break;
        case 38:
          dispatchPosicaoCarro(
            jogoActions.JOGO_CARRO_TURBO,
            ativaTimerFinalizarTurbo
          );
          break;
        case 68:
        case 39:
          dispatchPosicaoCarro(jogoActions.JOGO_CARRO_DIREITA);
          break;
        case 83:
          dispatchPosicaoCarro(jogoActions.JOGO_CARRO_CENTRO);
          break;
        case 27:
          pausaJogo();
          break;
        default:
          break;
      }
    },
    [jogoIniciado, jogoPausado, aguardarContagem, podeUsarTurbo]
  );

  React.useEffect(() => {
    if (jogoIniciado === true && !jogoPausado)
      window.addEventListener("keydown", handleTeclasPosicao, false);
    else if (jogoPausado === true)
      window.removeEventListener("keydown", handleTeclasPosicao, false);
    return () => {
      window.removeEventListener("keydown", handleTeclasPosicao, false);
    };
  }, [jogoIniciado, jogoPausado, aguardarContagem, podeUsarTurbo]);

  return (
    <JogoContext.Provider
      value={{
        ...state,
        iniciaJogo,
        pausaJogo,
        jogoRemoverContagem,
        pararJogo,
        liberarUsoTurbo,
      }}
    >
      {children}
    </JogoContext.Provider>
  );
};

JogoProvider.propTypes = {
  children: PropTypes.node,
};

export default JogoProvider;
