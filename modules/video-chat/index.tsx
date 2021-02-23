import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import styled from "styled-components";
import io from "socket.io-client";

import NavigationComponent from "@/modules/video-chat/containers/navigation";
import PartnerVideoContainer from "@/modules/video-chat/containers/partner-video";
import ChatContainer from "@/modules/video-chat/containers/chat";
import { TMessage } from "@/modules/video-chat/types";
import { EMessageType } from "@/modules/consultations/controllers/consultation-controller";
import Selector from "@/modules/video-chat/selector";

const Page = styled.main`
    width: 100vw;
    height: 100vh;
`;


const VideoChatPage: NextPage = () => {
    const router = useRouter();

    const [socket, setSocket] = useState<SocketIOClient.Socket>();

    const [isCameraOn, setIsCameraOn] = useState(false);
    const [isMicroOn, setIsMicroOn] = useState(false);
    const [isChatOn, setIsChatOn] = useState(false);
    const [partnerName, setPartnerName] = useState("Ярослав Зотов");
    const [partnerSpeciality, setPartnerSpeciality] = useState("");
    const [partnerImagePath, setPartnerImagePath] = useState("");
    const [messages, setMessages] = useState<TMessage[]>([]);

    useEffect(() => {
        const query = {
            consultationId: router.query.id,
            userId: localStorage.getItem("uid"),
            isUser: localStorage.getItem("isUser"),
            accessToken: localStorage.getItem("accessToken"),
        };

        // setup socket io
        const socketIo = io("localhost:5000", {
            secure: true,
            query,
            transports: ["websocket"],
        });
        setSocket(socketIo);

        socketIo.on("success", async () => {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });

            const video = document.querySelector<HTMLVideoElement>("video#partner-video") as HTMLVideoElement;
            if (video?.src != null) {
                if ("srcObject" in video) {
                    video.srcObject = stream;
                } else {
                    (video as HTMLVideoElement).src = window.URL.createObjectURL(stream); // for older browsers
                }
            }
        });

        socketIo.on("new_message", (message: string) => {
            setMessages([
                ...messages,
                {
                    message,
                    isUser: false,
                    type: EMessageType.Message,
                }
            ]);
        });

        return () => {
            socketIo.disconnect();
        }
    }, []);

    if (!socket) return <React.Fragment/>;

    return <Page>
        <Head>
            <title>Видео консультация</title>
        </Head>
        <PartnerVideoContainer/>
        <NavigationComponent
                isCameraOn={isCameraOn}
                isMicroOn={isMicroOn}
                isChatOn={isChatOn}
                onTriggerCamera={() => setIsCameraOn(!isCameraOn)}
                onTriggerMicro={() => setIsMicroOn(!isMicroOn)}
                onTriggerChat={() => setIsChatOn(!isChatOn)}/>
        <ChatContainer
                sendMessage={(v) => setMessages([
                    ...messages,
                    {
                        isUser: true,
                        message: v,
                        type: EMessageType.Message
                    }
                ])}
                toggleIsChatOn={() => setIsChatOn(!isChatOn)}
                partnerName={partnerName}
                isChatOn={isChatOn}
                messageBlocks={Selector.getMessageBlocks(messages)}
                partnerSpeciality={partnerSpeciality}
                partnerImagePath={partnerImagePath}
        />
    </Page>;
}

export default VideoChatPage;
