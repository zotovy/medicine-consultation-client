import React from "react";
import styled from "styled-components";

type Props = {
  text: string;
  styles?: object;
};

const Title = styled.h1`
display: flex;
flex-direction: row;
justify-content: center;
font-size: 40px;

p {
  display: inline;
  color: #30b9d6;

  &::selection {
    background-color: rgba(0, 0, 0, 0);
    color: #30b9d6;
  }
}
`;

const TitleComponent: React.FC<Props> = (props: Props) => {


  return (
    // @ts-ignore
    <Title style={props.styles ?? {}}>
      {props.text}
      <p>.</p>
    </Title>
  );
};

export default TitleComponent;
