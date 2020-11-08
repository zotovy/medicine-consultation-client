import React from 'react';
import styled from "styled-components";

// Components
import { Input, ErrorText, Row, Field } from "./text-field";

type Props = {
    styles?: {
        input?: object;
        container?: object;
    }
    isOk?: boolean;
    hint?: string;
    onChange: (val: string) => void;
    value: string;
    error?: string;
    field?: string;
    onFocus?: () => void;
    needErrorHandle?: boolean;
}

const Column = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;


const CalendarIcon = styled.div`
    color: #ccc;
    border-radius: 50%;
    width: 14px;
    position: relative;
    right: 29px;
    cursor: pointer;

`;


const DateTextField: React.FC<Props> = (props: Props) => {

    const styles = { width: "calc(100% + 14px)" }

    return <Column className="text-field">
        <Field>{props.field}</Field>
        <Row>
            <Input
                onFocus={props.onFocus}
                {/* 
          // @ts-ignore */ ...{}}
                style={styles}
                placeholder={props.hint}
                onChange={(e) => props.onChange(e.target.value)}
                value={props.value}
            />
            <CalendarIcon><i className="fa fa-calendar-o"></i></CalendarIcon>
        </Row>
        {
            !props.needErrorHandle ? props.error ? <ErrorText>{props.error}</ErrorText> : <p style={{ fontSize: "12px" }}>⠀</p> : ""
        }
    </Column>
}

export default DateTextField;