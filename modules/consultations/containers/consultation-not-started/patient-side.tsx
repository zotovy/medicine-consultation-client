import React from "react";
import Layout from "./layout";

export type Props = {}

const PatientSideNotStartedConsultation: React.FC<Props> = ({}) => {
    return <Layout
            title={"Консультация еще не началась"}
            subtitle={"Ваша консультация начнется\nчерез 3 часа 5 минут 10 секунд"}
            button={"secondary"}
            buttonText={"Назад"}
            onClick={() => {}}/>
}

export default PatientSideNotStartedConsultation;
