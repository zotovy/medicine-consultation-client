import React from "react";
import styled from "styled-components";
import { mainColor, dark, darkGrey, disable } from "../styles";


type Props = {
  validator?: any;
  onFocus?: () => void;
  onBlur?: () => void;
  inputId?: string; // user for testing
  onChange: (value: string) => void;
  value?: string;
  field?: string;
  hint?: string;
  type?: string;
  inputRef?: any;
  error?: string;
  needErrorHandle?: boolean;
  onShowPasswordChanged?: () => void;
  showPassword?: boolean;
  styles?: {
    container?: object;
    field?: object;
    input?: object;
  };
  inputDataTest?: string;
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    width: 100%;

      
  `;

const Field = styled.p`
  font-size: 0.8rem;
  color: ${darkGrey};
  margin-bottom: 3px;

  /* Phone */
  @media screen and (max-width: 424px) {
    font-size: 16px;
  }

  /* Tablet */
  @media screen and (max-width: 1025px) and (min-width: 768px) {
      font-size: 16px;      
  }

  /* Desktop */
  @media screen and (min-width: 1025px) {
    font-size: 14px;
  }
`;

const ErrorText = styled.span`
  font-size: 12px;
  color: #ff3b30;
  transition: 300ms ease-in-out;

`;

const Input = styled.input`
    text-overflow: ellipsis;
    width: 100%;
    outline: none;
    border: solid 1.15px ${disable};
    border-radius: 5px;
    padding: 12px;
    color: ${dark};
    font-size: 14px;
    transition: border 0.25s ease-in-out;
    

    &::placeholder {
      color: #707070;
    }

    &:focus {
      outline: none !important;
      border: 1.15px solid ${mainColor};
      color: ${dark};
    }

    i {
      font-size: 14px;
    }

    /* Phone */
    @media screen and (max-width: 424px) {
      font-size: 16px;
    }


    /* Tablet */
    @media screen and (max-width: 1025px) and (min-width: 768px) {
      font-size: 16px;
      padding: 15px;
      width: 100%;
    }

    /* Desktop */
    @media screen and (min-width: 1025px) {
      font-size: 14px;
    }
  `;


const Row = styled.div`
  width: calc(100% + 14px);
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ShowPassword = styled.div`
  border-radius: 50%;
  width: 14px;
  position: relative;
  z-index: 2;
  right: 29px;
  cursor: pointer;

  &:hover {
    color: #b2b2b2;
  }



`;

const TextField: React.FC<Props> = (props: Props) => {


  const styles = props.field === "Пароль" && !props.showPassword ? { letterSpacing: "5px", width: "calc(100% + 14px)" } : {};

  let inputStyles = props.styles?.input || {};
  inputStyles = {
    ...inputStyles,
    ...styles,
  }

  if (props.type === "password" && !props.showPassword) {
    inputStyles = {
      ...inputStyles,
      letterSpacing: "5px",
    }
  }

  if (props.error) {
    inputStyles = {
      ...inputStyles,
      border: "1.15px solid #ff3b30"
    }
  }



  return (
    // @ts-ignore
    <Container style={props.styles?.container || {}} className="text-field" >
      {/*
       // @ts-ignore */}
      <Field style={props.styles?.field || {}}>{props.field}</Field>
      {/*
          // @ts-ignore */}
      {props.field === "Пароль" ? <Row >
        <Input
          id={props.inputId}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          ref={props.inputRef}
          {/* 
          // @ts-ignore */ ...{}}
          style={inputStyles}
          placeholder={props.hint}
          onChange={(e) => props.onChange(e.target.value)}
          type={props.showPassword && props.value !== "" ? "text" : "password"}
          value={props.value}
          data-test={props.inputDataTest}
        />

        <ShowPassword id="show-password-button" style={{ color: props.showPassword ? "#282828" : "#ccc" }} onClick={props.onShowPasswordChanged}>
          {
            props.showPassword && props.value !== "" ? <i className="fa fa-eye-slash" ></i> : <i className="fa fa-eye"></i>

          }
        </ShowPassword>
      </Row> : <Input
          id={props.inputId}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          ref={props.inputRef}
          {/* 
          // @ts-ignore */ ...{}}
          style={inputStyles}
          placeholder={props.hint}
          onChange={(e) => props.onChange(e.target.value)}
          type={props.type ?? "text"}
          value={props.value}
          data-test={props.inputDataTest}
        />}

      {
        !props.needErrorHandle ? props.error ? <ErrorText>{props.error}</ErrorText> : <p style={{ fontSize: "12px" }} className="textfield-error">⠀</p> : ""
      }

    </Container>
  );
};

export default TextField;

export {
  Input,
  ErrorText,
  Row,
  Field,
  Container,
}
