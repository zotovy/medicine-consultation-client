import React from "react";
import styled from "styled-components";

type Props = {
  children?: any;
  styles?: object;
};

const Subtitle = styled.p`
    color: #565656;
    
    /* Phone */
    @media screen and (max-width: 424px) {
      font-size: 16px;
      text-align: center;
    }

    /* Tablet */
    @media screen and (min-width: 424px) and (max-width: 1025px) {
      font-size: 20px;
    }

    /* Desktop */
    @media screen and (min-width: 1025px) {
      font-size: 20px;
    }
  `;


const SubTitleComponent: React.FC<Props> = (props: Props) => {



  // @ts-ignore
  return <Subtitle style={props.styles}>
    {props.children}
  </Subtitle>;
};

export default SubTitleComponent;
