import React from "react";
import "./create.scss";
import { Link } from "react-router-dom";

// Components
import TextField from "../../../../components/text-field";
import DropDown from "../../../../components/dropdown";
import TextArea from "../../../../components/textarea";
import ConfirmButton from "../../../../components/confirm-button";
import SupportHeader from "../../components/header";

/**
 * This page is injectable. Do not use it without any wrapper
 */

const questionTypes = ["Техническая", "Проблема с доктором", "Другое"];

const CreatePage: React.FC = () => {
    return <div className="create-support-page">
        <SupportHeader title="Задать вопрос" link="/settings/support/" back="Назад"/>

        <form>
            <div className="row">
                <TextField
                    id="title"
                    onChange={() => {}}
                    field="Проблема"
                    hint="Название вашей проблемы"
                />
                <div className="space"/>
                <DropDown
                    options={questionTypes}
                    name="problem"
                    simulateField={true}
                    styles={{ minWidth: "200px" }}
                />
            </div>
            <TextArea
                field="Описание"
                hint="Опишите Вашу проблему"
                rows={15}
                resize="vertical"
                maxHeight="700px"
                minHeight="150px"
            />
        </form>
        <ConfirmButton onConfirm={() => {}} content="Отправить" />
    </div>;
}

export default CreatePage;
