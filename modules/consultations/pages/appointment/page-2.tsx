import React from "react";
import { observer } from "mobx-react";
import AppointmentController from "../../controllers/appoint-controller";
import { TYPES, useInjection } from "container";

// Components
import Title from "@/modules/auth/components/title";
import Container from "@/modules/auth/components/container";
import Subtitle from "@/modules/auth/components/subtitle";
import SizedBox from "@/components/sized-box";
import ConfirmButton from "@/components/confirm-button";
import TextField from "@/components/text-field";
import Divider from "@/modules/auth/components/divider";
import Document from "@/components/document";
import NewDocument from "../../components/new-document";
import TextArea from "@/components/textarea";

type Props = {
    className?: string;
}

const Page2: React.FC<Props> = (props) => {
    const controller = useInjection<AppointmentController>(TYPES.appointController);

    return <div className={`page page-2 ${props.className}`} >
        <Container>
            <Title text="Запись" />
            <SizedBox height="10px" />
            <Subtitle>Вам необходимо заполнить все недостающие<br />данные для записи на консультацию</Subtitle>
            <SizedBox height="20px" />
            <TextField
                onChange={(v) => controller.chronicDisease = v}
                value={controller.chronicDisease}
                field="Хронические заболевания"
                hint="Введите ваши хронические заболевания"
            />
            <TextArea
                className="symptoms"
                rows={7}
                onChange={(v) => controller.symptoms = v}
                field="Симптомы"
            />
            <SizedBox height="5px" />
            <Divider text="Документы" />
            <div className="documents">
                {
                    Array.from(controller.documents).map((_, i) => <Document
                        file={controller.documents[i]}
                        onClose={() => controller.removeDocuments(i)}
                    />)
                }
                {
                    controller.documents.length >= 10 ? <React.Fragment /> : <NewDocument />
                }
            </div>
            <SizedBox height="10px" />
            <ConfirmButton content="Оплатить" onConfirm={() => { }} />
        </Container>
    </div >
}

export default observer(Page2);
