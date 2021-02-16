import React from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

import Container from "./container";
import { CloseIcon } from "@/static/icons";
import UserCard from "@/modules/hub/components/user-card";

const Dialog = styled.div`
    width: 100%;
    max-width: 500px;
    max-height: 450px;
    background: white;
    border-radius: 15px;
    box-shadow: 0 7px 45px rgba(0, 0, 0, 0.1);
    position: relative;

    .header {
        display: flex;
        justify-content: space-between;
        padding: 20px;
        border-bottom: 1px solid #e1e4e8;

        svg path {
            fill: #30B9D6;
            cursor: pointer;
        }

        h3 {
            color: #282828;
            font-size: 22px;
            font-weight: 500;
        }
    }
    
    .content {
        padding: 20px;
        
        p {
            font-size: 18px;
            line-height: 1.4;
            color: #565656;
            margin-bottom: 30px;
        }
        
        .card {
            .userCard {
                min-width: initial;
            }
        }

        .buttons {
            margin-top: 30px;
            display: flex;

            button {
                padding: 0 15px;
                border-radius: 7px;
                background: #30B9D6;
                height: 40px;
                border: none;
                color: white;
                font-size: 16px;
                outline: none;
                cursor: pointer;
                
                &#reject {
                    margin-right: 20px;
                }
                
                &#cancel { 
                    background: none;
                    border: 1px solid #30B9D6;
                    color: #30B9D6;
                }
            }
        }
    }
`;

const RejectConsultationModal: React.FC<Props> = (props) => {

    if (!props.appoint) return <React.Fragment/>

    const consultation = props.appoint.consultation as Consultation;
    const patient = consultation.patient as UserType;
    const date = { from: props.appoint.from, to: props.appoint.to };

    // Animations
    const animation = useSpring({
        config: { mass: 5, tension: 2000, friction: 200 },
        from: { transform: "scale(0.5)" },
        to: { transform: props.canSee ? "scale(1)" : "scale(0.5)" },
    });

    return <Container className={`${props.canSee ? "open" : "close"}`}>
        <animated.div style={animation}>
            <Dialog>
                <div className="header">
                    <h3>Отменить консультацию</h3>
                    <div className="close-icon" onClick={props.onClose}>
                        <CloseIcon/>
                    </div>
                </div>

                <div className="content">
                    <p>
                        Вы действительно хотите отказаться от этой консультации?
                        Пользователь получит уведомление об отказе и консультация
                        не состоится, а Ваш уровень репутации упадет. Слишком
                        частый отказ от консультаций может привести к теневому бану.
                    </p>

                    <div className="card">
                        <UserCard date={date} name={props.appoint.patientName} profileImage={patient.photoUrl}/>
                    </div>

                    <div className="buttons">
                        <button id="reject" onClick={props.onReject}>Отказаться от консультации</button>
                        <button id="cancel" onClick={props.onClose}>Назад</button>
                    </div>
                </div>
            </Dialog>
        </animated.div>
    </Container>
}

export type Props = {
    canSee: boolean,
    appoint: IAppointment | null,
    onClose: () => any,
    onReject: () => any,
}

export default RejectConsultationModal;
