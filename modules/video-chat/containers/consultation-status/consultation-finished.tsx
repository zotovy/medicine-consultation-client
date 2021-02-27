import React from "react";
import { useRouter } from "next/router";
import Layout from "./layout";

export type Props = {
    consultationId: string;
    isUser: boolean;
}

const ConsultationFinished: React.FC<Props> = (props) => {
    const router = useRouter();
    let subtitle = "Эта консультация была завершена доктором";
    let buttonType : "primary" | "secondary" = "secondary";
    let buttonText = "Назад";
    let onClick = router.back;

    if (props.isUser) {
        subtitle = "Вы можете написать отзыв доктору";
        buttonType = "primary";
        buttonText = "Написать отзыв";
        onClick = () => router.push(`/consultation/${props.consultationId}/write-review`);
    }

    return <Layout
            title="Консультация завершена"
            subtitle={subtitle}
            button={buttonType}
            buttonText={buttonText}
            onClick={onClick} />
}

export default ConsultationFinished;
