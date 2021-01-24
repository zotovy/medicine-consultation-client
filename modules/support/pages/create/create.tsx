import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useWindowWidth } from "@react-hook/window-size";
import SupportController from "../../controllers/support-controller";
import styles from "./create.module.scss";
import withController from "@/utils/inject";

// Components
import TextField from "@/components/text-field";
import DropDown from "@/components/dropdown";
import TextArea from "@/components/textarea";
import ConfirmButton from "@/components/confirm-button";
import SupportHeader from "../../components/header";


/**
 * This page is injectable. Do not use it without any wrapper
 */

const questionTypes = ["Техническая", "Проблема с доктором", "Другое"];

type ControllerProps = { supportController: SupportController };

const CreatePage: React.FC<ControllerProps> = (props) => {
    const controller = props.supportController;
    const windowWidth = useWindowWidth();
    const router = useRouter();
    useEffect(() => {
       controller.goBackCb = () => router.back();
    }, []);

    return <div className={styles.createSupportPage}>
        <SupportHeader title="Задать вопрос" link="/settings/support/" back="Назад"/>

        <form>
            <div className={styles.row}>
                <TextField
                    id="title"
                    onChange={v => controller.createTitle = v}
                    field="Проблема"
                    hint="Название вашей проблемы"
                    error={controller.createTitleError}
                />
                <div className={styles.space}/>
                <DropDown
                    onSelect={v => controller.createProblem = v}
                    options={questionTypes}
                    values={["Tech", "Doctor", "Other"]}
                    name="problem"
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
        <ConfirmButton className={styles.confirmButton} onConfirm={controller.createQuestion} content="Отправить" />
    </div>;
}

export default withController(observer(CreatePage), "supportController");
