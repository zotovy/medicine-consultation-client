import React from "react";
import styled from "styled-components";

type Props = {
  centered?: boolean;
  children?: any;
  styles?: object;
};

const Link = styled.p`
    text-align: center;
    color: #282828;
    text-decoration: none;

    span {
      color: #30b9d6;
      text-decoration: none;
    }

    span:hover {
      cursor: pointer;
      text-decoration: underline;
    }

    /* Phone */
    @media screen and (max-width: 424px) {
      font-size: 16px;
    }

    /* Tablet */
    @media screen and (min-width: 424px) and (max-width: 1025px) {
      font-size: 20px;
    }

    /* Desktop */
    @media screen and (min-width: 1025px) {
      font-size: 18px;
    }
  `;

const LinkComponent: React.FC<Props> = (props: Props) => {

  return <Link style={props?.styles}>{props.children}</Link>;
};

export default LinkComponent;
