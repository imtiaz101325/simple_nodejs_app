import React from "react";
import styled from "styled-components";

const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  opacity: 0.8;
`;

export default function Loading() {
  return (
    <LoadingContainer>
      <h1>Loading...</h1>
    </LoadingContainer>
  );
}
