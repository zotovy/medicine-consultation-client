import React from "react";
import Layout from "./layout";
import { useRouter } from "next/router";

export type Props = {}

const PatientSideNotStartedConsultation: React.FC<Props> = ({}) => {
    const router = useRouter();

    return <Layout
            title={"Консультация еще не началась"}
            subtitle={"Ваша консультация начнется\n через 3 часа 5 минут 10 секунд"}
            button={"secondary"}
            buttonText={"Назад"}
            onClick={() => router.back()}/>
}

export default PatientSideNotStartedConsultation;
