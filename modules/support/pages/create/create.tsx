import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import SupportController from "../../controllers/support-controller";
import styles from "./create.module.scss";

// Components
import TextField from "@/components/text-field";
import DropDown from "@/components/dropdown";
import TextArea from "@/components/textarea";
import ConfirmButton from "@/components/confirm-button";
import SupportHeader from "../../components/header";
import { TYPES, useInjection } from "../../../../container";


/**
 * This page is injectable. Do not use it without any wrapper
 */

const questionTypes = ["Техническая", "Проблема с доктором", "Другое"];

const CreatePage: React.FC = () => {
    const controller = useInjection<SupportController>(TYPES.supportController);
    const router = useRouter();

    useEffect(() => {
        if (router.query.consultationId) {
            controller.fetchConsultation();
            controller.consultationSelectorValue = router.query.consultationId as string;
            controller.createProblem = "Doctor";
        }

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
                        value={controller.createProblem}
                        onSelect={v => {
                            console.log(v);
                            controller.createProblem = v;
                            if (v === "Doctor") controller.fetchConsultation();
                        }}
                        options={questionTypes}
                        values={["Tech", "Doctor", "Other"]}
                        name="problem"
                        styles={{ minWidth: "250px" }}
                        placeholder="Выберите тип проблемы"
                        error={controller.createProblemError}
                />
            </div>

            <div className={
                styles.consultationSelector + ` ${controller.createProblem === "Doctor" ? "" : styles.hidden}`}>
                <DropDown
                        value={controller.consultationSelectorValue}
                        error={controller.consultationSelectorError}
                        placeholder="Выберите консультацию, с которой у Вас проблемы"
                        onSelect={(v) => controller.consultationSelectorValue = v}
                        options={controller.availableConsultations.options}
                        values={controller.availableConsultations.values}/>
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
        <ConfirmButton className={styles.confirmButton} onConfirm={controller.createQuestion} content="Отправить"/>
    </div>;
}

export default observer(CreatePage);
