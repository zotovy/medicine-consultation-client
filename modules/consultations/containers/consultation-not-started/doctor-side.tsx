import React from "react";
import Layout from "./layout";

export type Props = {}

const DoctorSideNotStartedConsultation: React.FC<Props> = ({}) => {
    return <Layout
            title={"Пациент уже ожидает Вас!"}
            subtitle={"Нажмите на кнопку чтобы начать видео консультацию с Вашим пациентом "}
            button={"primary"}
            buttonText={"Начать"}
            onClick={() => {}}/>
}

export default DoctorSideNotStartedConsultation;
