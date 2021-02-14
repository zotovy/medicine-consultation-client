import React from "react";
import styled from "styled-components";

import Documents from "./documents";
import Information from "./information";
import MainInformation from "./main-information";
import { ChevronRight } from "@/static/icons";
import NoDataAppointInformationComponent from "@/modules/hub/containers/appoint-information/no-data";

const Container = styled.div`
    width: 100%;

    header {
        display: none;
    }

    .information_container {
        margin-top: 20px;
    }

    .documents {
        margin-bottom: 30px;
    }

    span.disclaimer {
        color: #282828;
        font-size: 18px;

        a.reject {
            color: #30B9D6;
            text-decoration: underline;
            cursor: pointer;
        }
    }

    @media screen and (max-width: 768px) {
        padding: 0 20px;

        header {
            display: flex;
            width: 100%;
            justify-content: space-between;

            svg, div {
                width: 6px;
                transform: rotate(-180deg);

                path {
                    stroke: #30b9d6;
                }
            }

            span.title {
                font-size: 16px;
                color: #282828;
                margin-bottom: 20px;
            }
        }

        span.disclaimer {
            font-size: 16px;
        }
    }

    @media screen and (min-width: 768px) and (max-width: 1300px) {
        span.disclaimer {
            font-size: 16px;
        }
        
        padding-left: 20px;
    }
`;


const AppointInformation: React.FC<Props> = (props) => {
    if (!props.appointment) return <NoDataAppointInformationComponent/>;

    return <Container className="appoint-information_container">
        <header>
            <p onClick={props.switchToNavigation}>
                <ChevronRight/>
            </p>
            <span className="title">Консультация</span>
            <div className="div"/>
        </header>

        <MainInformation
                patientPhotoUrl={props.appointment.consultation?.patient?.photoUrl}
                date={{ from: props.appointment.from, to: props.appointment.to }}
                onReject={() => {
                }}
                onConnect={() => {
                }}
                patientName={props.appointment.patientName}/>
        <Information {...props.appointment} />
        <Documents documents={props.appointment.documents}/>

        <span className="disclaimer">
            Консультация пройдет 10 декабря с 10:00 до 11:00. Вы можете <a className='reject'>отказаться</a> от этой
            консультации до её начала. После завершения консультации вы получите 1000₽ на свой баланс.
        </span>
    </Container>
}

type Props = {
    appointment: PropsAppointment | null,
    switchToNavigation: () => any,
}

interface PropsAppointment extends IAppointment {
    consultation: PropsConsultation,
}

interface PropsConsultation extends Consultation {
    patient: UserType,
}

export default AppointInformation;
