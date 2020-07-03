import React from "react";
import styled from "styled-components";

type Props = {
  children?: any;
  styles?: object;
};

const Subtitle = styled.p`
    font-size: 16px;
    color: #565656;
  `;

const SubTitleComponent: React.FC<Props> = (props: Props) => {



  // @ts-ignore
  return <Subtitle style={props.styles}>
    {props.children}
  </Subtitle>;
};

export default SubTitleComponent;
