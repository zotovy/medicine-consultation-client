import React from "react";
import styled from "styled-components";

type Props = {
  onConfirm: () => void;
  content: string;
  borderRadius?: string;
  fullSize?: boolean;
  size?: string;
  styles?: object;
};

const Button = styled.div`
    transition: 0.3s ease-in-out;
    cursor: pointer;
    width: calc(100% - 30px);
    background-color: #30b9d6;
    padding: 15px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    &:hover {
      box-shadow: 0px 3px 5px rgba(48, 185, 215, 0.3);
    }

    &:active {
      background: rgba(48, 185, 215, 0.8);
    }
  `;

const Text = styled.p`
color: white;
user-select: none;
-moz-user-select: none;
-khtml-user-select: none;
-webkit-user-select: none;
-o-user-select: none;
`;

const ConfirmButton: React.FC<Props> = (props: Props) => {
  return (
    <Button
      {/*
       // @ts-ignore */  ...{}}
      style={{ ...props.styles?.button, borderRadius: `${props.borderRadius ?? "10px"}` }}
      onClick={(e) => props.onConfirm()}
    >
      {/*
       // @ts-ignore */}
      <Text style={props.styles?.text}>{props.content}</Text>
    </Button>
  );
};

export default ConfirmButton;
