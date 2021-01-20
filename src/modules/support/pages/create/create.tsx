import React from "react";
import "./create.scss";
import { Link } from "react-router-dom";

// Components
import TextField from "../../../../components/text-field";
import DropDown from "../../../../components/dropdown";
import TextArea from "../../../../components/textarea";
import ConfirmButton from "../../../../components/confirm-button";

/**
 * This page is injectable. Do not use it without any wrapper
 */

const questionTypes = ["Техническая", "Проблема с доктором", "Другое"];

const CreatePage: React.FC = () => {
    return <div className="create-support-page">
        <header>
            <h1>Задать вопрос</h1>
            <Link to="/settings/support/">
                <button id="cancel">Назад</button>
            </Link>
        </header>

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
