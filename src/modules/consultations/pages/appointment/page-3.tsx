import React from "react";
import { observer } from "mobx-react";
import controller from "../../controller/appoint-controller";

// Components
import PayTitle from "../../components/appoint/pay-title";
import Container from "../../../auth/components/container";
import Subtitle from "../../../auth/components/subtitle";
import SizedBox from "../../../../components/sized-box";
import ConfirmButton from "../../../../components/confirm-button";
import TextField from "../../../../components/text-field";
import Divider from "../../../auth/components/divider";
import Document from "../../components/appoint/document";
import CardTextField from "../../components/appoint/card-textfield";

type Props = {
    className?: string;
}

const Page3: React.FC<Props> = (props) => {
    return <div className={`page page-3 ${props.className}`} >
        <Container>
            <PayTitle summa={444} />
            <SizedBox height="10px" />
            <Subtitle>Необходимо оплатить консультанцию. Сумма к оплате - 1500р Мы вернем ваши деньги если консультация не состоится</Subtitle>
            <SizedBox height="20px" />

            <div className="form">
                <CardTextField

                />
                <TextField
                    onChange={(v) => controller.cardOwner = v}
                    value={controller.cardOwner}
                    field="Владелец карты"
                    hint="IVAN IVANOV"
                />
                <TextField
                    onChange={(v) => controller.setCardTime(v)}
                    value={controller.cardTime}
                    field="Срок действия"
                    hint="XX/XX"
                    type="number"
                />
                <TextField
                    type="number"
                    onChange={(v) => controller.setCVV(v)}
                    value={controller.cvv}
                    field="СVV"
                    hint="XXX"
                />
            </div>
            <SizedBox height="10px" />
            <ConfirmButton content="Продолжить" onConfirm={() => controller.pageIndex = 0} />
        </Container>
    </div >
}

export default observer(Page3);