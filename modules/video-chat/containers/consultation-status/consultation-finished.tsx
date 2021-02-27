import React from "react";
import { useRouter } from "next/router";
import Layout from "./layout";

export type Props = {}

const ConsultationFinished: React.FC<Props> = ({}) => {
    const router = useRouter();

    return <Layout
            title="Консультация завершена"
            subtitle="Эта консультация была завершена доктором"
            button="secondary"
            buttonText="Назад"
            onClick={router.back} />
}

export default ConsultationFinished;
