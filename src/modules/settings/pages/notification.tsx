import React from "react";
import Navigation from "../components/navigation";
import TextField from "../../../components/text-field";
import Checkbox from "../../../components/checkbox";
import ConfirmButton from "../../../components/confirm-button"

const NotificationPage : React.FC = () => {

    return <main className="notifications-page settings-page">
        <Navigation active={3} />
        <section className="content notifications">
            <TextField
                onChange={(v) => {}}
                field="Email для уведомлений"
                needErrorHandle={false}
            />
            <Checkbox onChange={() => {}} label="Присылать уведомления о консультациях" checked={false} />
            <Checkbox onChange={() => {}} label="Рассылка по электронной почте" checked={true} />
            <ConfirmButton onConfirm={() => {}} content="Сохранить" />
        </section>
    </main>

}

export default NotificationPage;