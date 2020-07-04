import React from "react";
import styled from "styled-components";

const ContainerComponent = styled.div`
  background: white;

  /* Phone */
  @media screen and (max-width: 424px) {
    width: 100vw;
    height: 100%;
    padding: 5vw;
  }

  /* Tablet */
  @media screen and (min-width: 424px) and (max-width: 1025px) {
    width: 100vw;
    height: 100vh;
    padding: 5vw;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
  }

  /* Desktop */
  @media screen and (min-width: 1025px) {
    width: 50vw;
    max-width: 600px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    margin-left: 50px;
  }
`;

type Props = {
  children?: any;
}

const Container: React.FC<Props> = (props: Props) => {
  return <ContainerComponent>{props.children}</ContainerComponent>
}

export default Container;