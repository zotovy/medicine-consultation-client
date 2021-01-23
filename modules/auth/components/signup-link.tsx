import React from "react";
import styled from "styled-components";

type Props = {
  children?: any;
}

const LinkContainer = styled.div`
  padding-left: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  white-space: nowrap; 

  span {
    color: #30b9d6;
    text-decoration: none;
  }

  span:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  /* Mobile */
  @media screen and (max-width: 424px) {
    text-align: center;
    padding-left: 0;
  }

  /* Tablet */
  @media screen and (min-width: 425px) and (max-width: 768px) {
    width: 300px;
    font-size: 18px;
  }
`;

const SignupLink: React.FC<Props> = (props: Props) => {
  return <LinkContainer>{props.children}</LinkContainer>
}

export default SignupLink;
