import React from "react";
import { observer } from "mobx-react";
import controller from "../../controller/appoint-controller";
import { VisaIcon, CardIcon, MastercardIcon, MirIcon } from "../../icons";
import { Input, Container, Field } from "../../../../components/text-field";


const CardTextField: React.FC = () => {

    let Icon = CardIcon;
    const icon = controller.cardIcon;

    console.log(controller.cardIcon);

    if (icon === "visa") Icon = VisaIcon;
    else if (icon === "mastercard") Icon = MastercardIcon;
    else if (icon === "mir") Icon = MirIcon;

    return <Container>
        <Field>Номер вашей карты</Field>
        <div className="card-text-field">
            <Input
                value={controller.cardNumber}
                onChange={(e) => controller.setIcon(e.target.value)}
                placeholder="XXXX XXXX XXXX XXXX" />
            <Icon />
        </div>
    </Container>
}

export default observer(CardTextField);