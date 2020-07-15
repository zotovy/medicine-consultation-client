import React from "react";
import styled from "styled-components";

type Props = {
    text: string;
}

const Container = styled.div`
    width: 100%;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
`;

const Line = styled.div`
    height: 1px;
    width: 100%;
    background: #ccc;
    border-radius: 0.5px;
`;

const Text = styled.div`
    padding-right: 10px;
    color: #282828;
    font-size: 16px;
    white-space: nowrap; 
`;

const Divider: React.FC<Props> = (props: Props) => {
    return <Container>
        <Text>{props.text}</Text>
        <Line />
    </Container>
}

export default Divider;
