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
import NewDocument from "../../components/appoint/new-document";

type Props = {
    className?: string;
}

const Page2: React.FC<Props> = (props) => {
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
            <div className="sc-AxhCb cEIUzV text-field" style={{ marginBottom: "10px" }} >
                <p className="sc-AxhUy jMzJqM">Симптомы</p>
                <div className="textarea-wrapper">
                    <textarea
                        className="symptoms"
                        name="text1"
                        rows={7}
                        onChange={(e) => controller.symptoms = e.target.value}
                        placeholder="Введите ваши симптомы"
                    >

                    </textarea>
                </div>
            </div>
            <SizedBox height="5px" />
            <Divider text="Документы" />
            <div className="documents">
                {
                    Array.from(controller.documents).map((_, i) => <Document index={i} />)
                }
                {
                    controller.documents.length >= 10 ? <React.Fragment /> : <NewDocument />
                }
            </div>
            <SizedBox height="10px" />
            <ConfirmButton content="Продолжить" onConfirm={() => controller.pageIndex = 2} />
        </Container>
    </div >
}

export default observer(Page2);