import React from "react";
import styled from "styled-components";

const Button = styled.button`
  padding: 10px 15px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  border: none;
  outline: none;
  font-size: 16px;
  cursor: pointer;
  transition: box-shadow 300ms;
  
  svg {
    width: 15px;
    height: 15px;
    margin-right: 10px;
  }
  
  &:hover {
    &.primary {
        box-shadow: 0px 2px 4px rgba(48, 185, 215, 0.3);
    }
    
    &.secondary {
      background: #E6F2F4;
    }
  }
  
  &.primary {
    background: #30b9d6;
    color: white;
    
    svg {
      fill: white;
    }
  }
  
  &.secondary {
    background: #E9F7FA;
    color: #30b9d6;
    
    svg { 
      fill: #30b9d6;
    }
  }
`;


export type Props = {
    type?: "primary" | "secondary";
    onClick?: () => any;
}

const PrimaryButton: React.FC<Props> = ({ type = "primary" , children , onClick}) => {
    return <Button className={`primary-button__component ${type}`} onClick={onClick}>
        { children }
    </Button>
}

export default PrimaryButton;