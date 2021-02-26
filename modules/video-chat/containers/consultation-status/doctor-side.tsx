import React, { useEffect, useState } from "react";
import Layout from "./layout";
import FormatServices from "@/services/format-services";
import { useRouter } from "next/router";

export type Props = {
    startDate: Date,
    startConsultation: () => any,
}

const DoctorSideNotStartedConsultation: React.FC<Props> = (props) => {
    const router = useRouter();
    let title = "";
    let subtitle = "";

    const now = new Date();
    const deltaInMill = props.startDate.getTime() - now.getTime();
    const [delta, setDelta] = useState(FormatServices.getDateDeltaInTimeTypes(deltaInMill));

    useEffect(() => {
        async function runTimer() {
            if (delta.days > 0) return;
            for (let i = 0; i < deltaInMill / 1000; i++) {
                await new Promise((res) => {
                    setTimeout(() => {
                        const newDelta = delta;
                        if (newDelta.seconds !== 0) newDelta.seconds -= 1;
                        else {
                            newDelta.seconds = 59;
                            if (newDelta.minutes !== 0) newDelta.minutes -= 1;
                            else {
                                newDelta.minutes = 59;
                                newDelta.hours -= 1;
                            }
                        }
                        setDelta({ ...newDelta });
                        res();
                    }, 1000);
                })
            }
        }
        runTimer();
    }, []);

    if (deltaInMill < 0) {
        title = "Пациент уже ожидает Вас!";
        subtitle = "Нажмите на кнопку чтобы начать видео консультацию с Вашим пациентом";
    } else {
        title = "Консультация еще не началась";

        if (delta.days > 0) {
            subtitle = `Консультация начнется через ${delta.days} `
                    + `${FormatServices.getNumEnding(delta.days, ["день", "дня", "дней"])}`;
        } else {
            const hours = delta.hours > 0 ?`${delta.hours} ${FormatServices.getNumEnding(delta.hours, ["час ", "часа ", "часов "])}` : "";
            const minutes = delta.minutes > 0 ?`${delta.minutes} ${FormatServices.getNumEnding(delta.minutes, ["минуту ", "минуты ", "минут "])}` : "";
            const seconds = delta.seconds > 0 ? `${delta.seconds} ${FormatServices.getNumEnding(delta.seconds, ["секунду ", "секунды ", "секунд "])}` : "";
            subtitle = `Консультация начнется\nчерез ${hours}${minutes}${seconds}`;
        }
    }

    return <Layout
            title={title}
            subtitle={subtitle}
            button={"primary"}
            buttonText={deltaInMill < 0 ? "Начать" : "Назад"}
            onClick={deltaInMill < 0 ? props.startConsultation : router.back}/>
}

export default DoctorSideNotStartedConsultation;
