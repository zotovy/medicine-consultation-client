import React from "react";
import { observer } from "mobx-react";
import controller from "../../controller/appoint-controller";

// Components
import Title from "../../../auth/components/title";
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
            <Title text="Оплата" />
            <SizedBox height="10px" />
            <Subtitle>Необходимо оплатить консультанцию. Мы вернем ваши деньги если консультация не состоится</Subtitle>
            <SizedBox height="20px" />

            <div className="form">
                <CardTextField

                />
                <TextField
                    onChange={(v) => controller.chronicDisease = v}
                    value={controller.chronicDisease}
                    field="Хронические заболевания"
                    hint="Введите ваши хронические заболевания"
                />
                <TextField
                    onChange={(v) => controller.chronicDisease = v}
                    value={controller.chronicDisease}
                    field="Хронические заболевания"
                    hint="Введите ваши хронические заболевания"
                />
                <TextField
                    onChange={(v) => controller.chronicDisease = v}
                    value={controller.chronicDisease}
                    field="Хронические заболевания"
                    hint="Введите ваши хронические заболевания"
                />
            </div>



            <SizedBox height="10px" />
            <ConfirmButton content="Продолжить" onConfirm={() => controller.pageIndex = 0} />
        </Container>
    </div >
}

export default observer(Page3);