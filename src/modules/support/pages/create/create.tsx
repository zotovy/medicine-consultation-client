import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react";
import "./create.scss";
import controller from "../../controllers/support-controller";
import { useWindowWidth } from "@react-hook/window-size";

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
    const windowWidth = useWindowWidth();
    const history = useHistory();
    useEffect(() => {
       controller.goBackCb = () => history.goBack();
    }, []);

    return <div className="create-support-page">
        <SupportHeader title="Задать вопрос" link="/settings/support/" back="Назад"/>

        <form>
            <div className="row">
                <TextField
                    id="title"
                    onChange={v => controller.createTitle = v}
                    field="Проблема"
                    hint="Название вашей проблемы"
                    error={controller.createTitleError}
                />
                <div className="space"/>
                <DropDown
                    onSelect={v => controller.createProblem = v}
                    options={questionTypes}
                    values={["Tech", "Doctor", "Other"]}
                    name="problem"
                    simulateField={windowWidth >= 960}
                    styles={{ minWidth: "250px" }}
                    placeholder="Выберите тип проблемы"
                    error={controller.createProblemError}
                />
            </div>
            <TextArea
                onChange={v => controller.createDescription = v}
                field="Описание"
                hint="Опишите Вашу проблему"
                rows={15}
                resize="vertical"
                maxHeight="700px"
                minHeight="150px"
                error={controller.createDescriptionError}
            />
        </form>
        <ConfirmButton onConfirm={controller.createQuestion} content="Отправить" />
    </div>;
}

export default observer(CreatePage);
