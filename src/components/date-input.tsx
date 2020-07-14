import React from "react";
import styled from "styled-components";
import { DatePicker } from "rsuite";

// Static
import 'rsuite/dist/styles/rsuite-default.css';

import { Input, Row, ErrorText, Field, Container } from "./text-field";

type Props = {
    value?: string;
    field?: string;
    hint?: string;
    type?: string;
    error?: string;
    showCalendar?: boolean;
    onShowCalendar: () => void;
    onDatePicked: () => void;
    styles?: {
        container?: object;
        field?: object;
        input?: object;
    };
};

const CalendarIcon = styled.div`
    border-radius: 50%;
    width: 14px;
    position: relative;
    z-index: 2;
    right: 29px;
    cursor: pointer;
    color: #565656;

    &:hover {
        color: #b2b2b2;
    }
`;

const CalendarContainer = styled.div`
    width: 100px;
    height: 100px;
`;


const styles = {
    width: "100%",
    border: "solid 1.15px #ccc",
    borderRadius: "5px",
    padding: "12px",
    color: "#282828",
    fontSize: "14px",
    transition: "border 0.25s ease-in-out",
}

const DateInput: React.FC<Props> = (props: Props) => {



    return <Container>
        <Field>{props.field}</Field>
        <DatePicker style={styles} />
    </Container>
}

export default DateInput;
