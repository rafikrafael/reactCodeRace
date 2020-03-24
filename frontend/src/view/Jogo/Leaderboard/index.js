import React from "react";
import PropTypes from "prop-types";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { getUltimos15Leaderboards } from "service/leaderboards";
import styled from "styled-components";
import MaterialTable from "material-table";
import moment from "moment";

const Container = styled.div`
  position: relative;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  max-height: 60%;
  width: 80%;

  .button {
    padding-top: 10px;
    padding-bottom: 10px;
  }
`;

const columns = [
  { title: "Nome", field: "nome" },
  { title: "Tempo Total", field: "tempoTotal", type: "numeric" },
  {
    title: "Obtido Em",
    field: "createdAt",
    render: ({ createdAt }) =>
      moment(Number(createdAt)).format("DD/MM/YYYY HH:mm:ss"),
  },
];

function Leaderboard({ isVisible = false, onClose }) {
  const [leaderboard, setLeaderboard] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadValores = async () => {
      const retorno = await getUltimos15Leaderboards();
      if (retorno) setLeaderboard(retorno);
      setIsLoading(false);
    };
    if (isVisible === true) loadValores();
  }, [isVisible]);
  return (
    <Modal open={isVisible}>
      <Container>
        <MaterialTable
          isLoading={isLoading}
          title="Leaderboard"
          columns={columns}
          data={leaderboard}
          localization={{
            body: {
              emptyDataSourceMessage: "Sem registros",
            },
            pagination: {
              labelRowsSelect: "Linhas",
              labelRowsPerPage: "Linhas por página",
              labelDisplayedRows: "{from}-{to} de {count}",
              firstAriaLabel: "Primeira página",
              firstTooltip: "Primeira página",
              previousAriaLabel: "Página anterior",
              previousTooltip: "Página anterior",
              nextAriaLabel: "Proxima página",
              nextTooltip: "Proxima página",
              lastAriaLabel: "Ultima página",
              lastTooltip: "Ultima página",
              searchPlaceholder: "Procurar",
              searchTooltip: "Procurar",
            },
          }}
          options={{
            // toolbar: false,
            // showTitle: false,
            grouping: false,
            sorting: false,
            pageSizeOptions: [5],
          }}
        />
        <Button className="button" fullWidth color="primary" variant="contained" onClick={onClose}>
          Voltar
        </Button>
      </Container>
    </Modal>
  );
}

Leaderboard.propTypes = {
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Leaderboard;
