import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Layout from "./layout";

const SomethingWrong = styled.a`
    position: fixed;
    bottom: 40px;
    text-align: center;
    width: 100%;
    cursor: pointer;
    font-size: 16px;
    color: #30B9D6;
`;

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

    return <React.Fragment>
        <Layout
                title="Консультация завершена"
                subtitle={subtitle}
                button={buttonType}
                buttonText={buttonText}
                onClick={onClick} />

        <SomethingWrong onClick={() => router.push("/settings/support/create")}>
            Что-то пошло не так?
        </SomethingWrong>
    </React.Fragment>
}

export default ConsultationFinished;
