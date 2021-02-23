import React from "react";
import styled from "styled-components";
import { BackIcon } from "@/static/icons";
import TextField from "./textfield";
import Messages from "./messages";
import { TMessageBlock } from "@/modules/video-chat/types";

const Container = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
    background-color: white;
    width: 30vw;
    padding: 15px 0 15px 15px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    transition: transform 750ms;

    &.off {
        transform: translateX(30vw);
    }

    @media screen and (min-width: 425px) {
        .back {
            display: none;
        }
    }


    header {
        display: flex;
        align-items: center;
        border-bottom: 1px #ccc solid;
        padding-bottom: 10px;
        margin-bottom: 10px;
        width: calc(100% - 20px);

        .avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: rgba(0, 0, 0, 0.1);
            background-size: cover;
            margin-right: 10px;
        }

        span {
            font-size: 16px;

            &#name {
                color: #282828;
                margin-right: 10px;
            }

            &#speciality {
                color: #707070;
                font-style: italic;
            }
        }


    }

    .messages {
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
    @include scroll();
        flex-shrink: 0;
        width: 100%;
        height: calc(100% - 105px);
        padding: 10px;

        .block {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;

            &.user-block {
                align-items: flex-end;
            }

            * {
                margin-bottom: 12px;
            }

            .avatar {
                width: 45px;
                height: 45px;
                border-radius: 50%;
                background-color: rgba(0, 0, 0, 0.1);
                background-size: cover;
            }

            .message {
                display: flex;
                margin-bottom: 3px;

                span {
                    padding: 10px;
                    background-color: #F7F7F7;
                    border-radius: 7px;
                    color: #282828;
                    word-wrap: break-word;
                }
            }
        }

        .connection-message {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 7px;

            span {
                font-size: 14px;
                color: #727272;
            }
        }

    }

    .textfield {
        padding: 10px 0;
        display: flex;
        flex-shrink: 0;
        align-items: center;
        width: calc(100% - 20px);
        border-top: solid 1px #cccccc;

        .emoji {
            width: 32px;
            height: 32px;
            cursor: pointer;
            margin-right: 10px;
            display: flex;
            justify-content: center;
            align-items: center;

            svg {
                width: 24px;
                height: 24px;
            }
        }

        input {
            width: calc(100% - 48px);
            border: none;
            outline: none;
            font-size: 16px;
        }

        button#send {
            width: 38px;
            height: 38px;
            margin-left: 10px;
            border-radius: 50%;
            background-color: #30B9D6;
            border: none;
            display: flex;
            justify-content: center;
            align-items: center;
        @include primaryBoxShadow();
            cursor: pointer;
            outline: none;
        }
    }

    @media screen and (max-width: 425px) {
        width: 100vw;
        transition: 300ms ease;

        &.off {
            transform: translateY(100vh);
        }
    }
`;

const ChatContainer: React.FC<Props> = (props) => {

    const avatar = {
        backgroundImage: `url("${
                !props.partnerImagePath || props.partnerImagePath?.trim() === ""
                        ? "../../static/images/user-placeholder.jpg"
                        : props.partnerImagePath
        }")`,
    }

    console.log(avatar);

    return <Container className={`chat ${props.isChatOn ? "" : "off"}`}>
        <header>
            <div className="back" onClick={props.toggleIsChatOn}>
                <BackIcon/>
            </div>
            <div className="avatar" style={avatar}/>
            <div className="info">
                <span id="name">{props.partnerName}</span>
                {
                    props.partnerSpeciality !== ""
                            ? <span id="speciality">({props.partnerSpeciality})</span>
                            : <React.Fragment/>
                }
            </div>
        </header>
        <Messages partnerName={props.partnerName} blocks={props.messageBlocks}/>
        <TextField sendMessage={props.sendMessage}/>
    </Container>
}

export type Props = {
    toggleIsChatOn: () => any;
    isChatOn: boolean;
    partnerImagePath?: string;
    partnerSpeciality: string;
    partnerName: string;
    messageBlocks: TMessageBlock[];
    sendMessage: (v: string) => any,
}
export default ChatContainer;
