import React from "react";
import styled from "styled-components";

// Components
import Checkbox from "../../../components/checkbox";
import SizedBox from "../../../components/sized-box";

type Props = {
    isMale: boolean;
    onChange: () => void;
}

const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const Field = styled.div`
    color: #565656;

    /* Phone */
    @media screen and (max-width: 424px) {
      
    }

    /* Tablet */
    @media screen and (min-width: 424px) and (max-width: 1025px) {
      font-size: 16px;
    }

    /* Desktop */
    @media screen and (min-width: 1025px) {
      font-size: 14px;
    }
`;



const SexCheckbox: React.FC<Props> = (props: Props) => {
    return <Column>
        <Field>Пол</Field>
        <Row>
            <Checkbox dataTest="male-checkbox" checked={props.isMale} label="Мужской" onChange={() => !props.isMale ? props.onChange() : null} />
            <SizedBox width="50px" />
            <Checkbox dataTest="female-checkbox" checked={!props.isMale} label="Женский" onChange={() => props.isMale ? props.onChange() : null} />
        </Row>
    </Column>
}

export default SexCheckbox;