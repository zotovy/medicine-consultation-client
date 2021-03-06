import React from "react";
import styled from "styled-components";
import CheckboxBase from "./checkbox-base";

type Props = {
  id?: string;
  label: string;
  checked: boolean;
  onChange: () => void;
  linkText?: string;
  linkPath?: string;
  styles?: object;
  href?: string;
  dataTest?: string;
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  
  
`;

const Text = styled.p`
  margin-left: 10px;
  font-size: 16px;
  color: #282828;

  a {
    color: #30b9d6;
    text-decoration: none;
  }

  a:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  /* Phone */
  @media screen and (max-width: 424px) {
  }

  /* Tablet */
  @media screen and (min-width: 424px) and (max-width: 1025px) {
  }

  /* Desktop */
  @media screen and (min-width: 1025px) {
  }

  
`;

const Checkbox: React.FC<Props> = (props: Props) => {
  return (
    <div className="checkbox-component" id={props.id}>
      {/*
      // @ts-ignore */}
      < Container style={props.styles?.container} >
        <CheckboxBase for={props.id} checked={props.checked} onChange={props.onChange} dataTest={props.dataTest} />


        {/*
       // @ts-ignore */}
        <Text style={props.styles?.text || {}}>
          {props.label}
          <a target="_blank" href={props.href ?? "#"}>{props.linkText}</a>
        </Text>
      </Container >
    </div>
  );
};

export default Checkbox;
