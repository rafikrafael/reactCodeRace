import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import BoxContainerCenter from "./BoxContainerCenter";

const TituloStyled = styled.h1`
  text-align: center;
  border-bottom: 1px solid;
  margin-bottom: 10px;
`;

function MenuCenter({ title, children }) {
  return (
    <BoxContainerCenter>
      <TituloStyled>{title}</TituloStyled>
      {children}
    </BoxContainerCenter>
  );
}

MenuCenter.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default MenuCenter;
