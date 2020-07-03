import React from "react";
import styled from "styled-components";

type Props = {
  centered: boolean;
  children?: any;
  styles?: object;
};

const Link = styled.p`
    text-align: center;
    font-size: 16px;
    color: #282828;
    text-decoration: none;

   


    a {
      color: #30b9d6;
      text-decoration: none;
    }

    a:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  `;

const LinkComponent: React.FC<Props> = (props: Props) => {

  return <Link style={props?.styles}>{props.children}</Link>;
};

export default LinkComponent;
