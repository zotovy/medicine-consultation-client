import React from "react";
import styled from "styled-components";
import { CameraIcon, ChatIcon, MicroIcon } from "@/static/icons";

const Container = styled.div`
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: 100%;

    button {
        width: 52px;
        height: 52px;
        margin: 0 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.15);
        backdrop-filter: blur(15px) ;
        cursor: pointer;
        transition: background 150ms ease-in-out;
        border: none;
        outline: none;

        &.leave {
            backdrop-filter: none;
            background: #FF3B30;
        }

        .unread-messages {
            position: absolute;
            right: 0;
            top: 0;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: #30B9D6;
            font-size: 12px;

            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
        }

        &.active {
            background-color: #30B9D6;
        }

        svg {
            width: 28px;
            height: 28px;
        }

    }
`;

export type Props = {
    onTriggerCamera: () => any,
    onTriggerMicro: () => any,
    onTriggerChat: () => any,
    isCameraOn: boolean;
    isMicroOn: boolean;
    isChatOn: boolean;
}

const NavigationComponent: React.FC<Props> = (props) => {
    return <Container>
        <button onClick={props.onTriggerCamera} className={props.isCameraOn ? "active" : ""}>
            <CameraIcon/>
        </button>
        <button onClick={props.onTriggerMicro} className={props.isMicroOn ? "active" : ""}>
            <MicroIcon/>
        </button>
        <button onClick={props.onTriggerChat} className={props.isChatOn ? "active" : ""}>
            <ChatIcon/>
        </button>
    </Container>;
}

export default NavigationComponent;
