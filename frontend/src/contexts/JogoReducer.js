import { tempoVoltas } from "consts/conts";

export const jogoActions = {
  JOGO_INICIAR: "jogo/INICIAR",
  JOGO_REMOVER_CONTAGEM: "jogo/REMOVER_CONTAGEM",
  JOGO_PAUSAR: "jogo/PAUSAR",
  JOGO_PARAR: "jogo/PARAR",
  JOGO_ENCERRAR_VOLTAS: "jogo/encerrar_voltas",
  JOGO_CARRO_CENTRO: "jogo/carro_centro",
  JOGO_CARRO_ESQUERDA: "jogo/carro_esquerda",
  JOGO_CARRO_DIREITA: "jogo/carro_direita",
  JOGO_CARRO_TURBO: "jogo/carro_turbo",
  JOGO_CARRO_LIBERAR_TURBO: "jogo/carro_liberar_turbo",
  JOGO_CARRO_TURBO_POSICAO: "jogo/carro_turbo_posicao",
  JOGO_NUMERO_VOLTAS: "jogo/carro_numero_voltas",
};

const getNovaPosicaoCarro = (posicaoAtual, irPara) => {
  const novaPosicao = posicaoAtual + irPara;
  return novaPosicao < -165
    ? posicaoAtual
    : novaPosicao > 65
    ? posicaoAtual
    : novaPosicao;
};

export const posicoesCarro = {
  ESQUERDA: -10,
  CENTRO: -55,
  DIREITA: 10,
};

export const valorInicial = {
  aguardarContagem: false,
  jogoIniciado: false,
  jogoPausado: false,
  tempos: [],
  nomeJogador: "",
  carroPosicao: posicoesCarro.CENTRO,
  usarTurbo: false,
  podeUsarTurbo: false,
  turboPosicao: 0,
};

export const jogoReducer = (state, action) => {
  switch (action.type) {
    case jogoActions.JOGO_INICIAR:
      return {
        ...state,
        aguardarContagem: true,
        jogoIniciado: true,
        jogoPausado: false,
        turboPosicao: 0,
        voltas: 0,
        tempos: [],
        nomeJogador: action.payload,
      };
    case jogoActions.JOGO_REMOVER_CONTAGEM:
      return {
        ...state,
        aguardarContagem: false,
      };
    case jogoActions.JOGO_PAUSAR: {
      const { jogoPausado } = state;
      return {
        ...state,
        jogoPausado: !jogoPausado,
      };
    }
    case jogoActions.JOGO_PARAR: {
      return {
        ...state,
        ...valorInicial,
      };
    }
    case jogoActions.JOGO_CARRO_CENTRO: {
      return {
        ...state,
        carroPosicao: posicoesCarro.CENTRO,
      };
    }
    case jogoActions.JOGO_CARRO_DIREITA: {
      const { carroPosicao } = state;
      return {
        ...state,
        carroPosicao: getNovaPosicaoCarro(carroPosicao, posicoesCarro.DIREITA),
      };
    }
    case jogoActions.JOGO_CARRO_ESQUERDA: {
      const { carroPosicao } = state;
      return {
        ...state,
        carroPosicao: getNovaPosicaoCarro(carroPosicao, posicoesCarro.ESQUERDA),
      };
    }
    case jogoActions.JOGO_CARRO_TURBO: {
      return {
        ...state,
        usarTurbo: action.payload,
      };
    }
    case jogoActions.JOGO_CARRO_LIBERAR_TURBO: {
      return {
        ...state,
        podeUsarTurbo: action.payload,
      };
    }
    case jogoActions.JOGO_CARRO_TURBO_POSICAO: {
      const { turboPosicao } = state;
      return {
        ...state,
        turboPosicao: turboPosicao + action.payload,
      };
    }
    case jogoActions.JOGO_NUMERO_VOLTAS: {
      const { tempos, turboPosicao } = state;
      const tempo = tempoVoltas - turboPosicao;
      return {
        ...state,
        tempos: [...tempos, tempo],
        turboPosicao: 0,
      };
    }
    case jogoActions.JOGO_ENCERRAR_VOLTAS: {
      return {
        ...state,
        jogoIniciado: false,
        usaTurbo: false,
        podeUsarTurbo: false,
      };
    }
    default:
      return state;
  }
};
