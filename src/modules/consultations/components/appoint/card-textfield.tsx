import React from "react";
import controller from "../../controller/appoint-controller";
import { VisaIcon, CardIcon, MastercardIcon, MirIcon } from "../../icons";
import { Input, Container, Field } from "../../../../components/text-field";


const CardTextField: React.FC = () => {



    return <Container>
        <Field>Номер вашей карты</Field>
        <div className="card-text-field">
            <Input />
            <VisaIcon />
        </div>
    </Container>
}

export default CardTextField;