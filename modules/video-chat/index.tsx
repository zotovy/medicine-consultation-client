import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";

import NavigationComponent from "@/modules/video-chat/containers/navigation";
import PartnerVideoContainer from "@/modules/video-chat/containers/partner-video";
import ChatContainer from "@/modules/video-chat/containers/chat";
import { TMessageBlock } from "@/modules/video-chat/types";

const Page = styled.main`
    width: 100vw;
    height: 100vh;
`;

const VideoChatPage: NextPage = () => {

    const [isCameraOn, setIsCameraOn] = useState(false);
    const [isMicroOn, setIsMicroOn] = useState(false);
    const [isChatOn, setIsChatOn] = useState(false);
    const [partnerName, setPartnerName] = useState("Ярослав Зотов");
    const [messageBlocks, setMessageBlocks] = useState<TMessageBlock[]>([]);
    const [partnerSpeciality, setPartnerSpeciality] = useState("");
    const [partnerImagePath, setPartnerImagePath] = useState("");

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        }).then(stream => {
            const video = document.querySelector<HTMLVideoElement>("video#partner-video") as HTMLVideoElement;
            if (video?.src != null) {
                if ("srcObject" in video) {
                    video.srcObject = stream;
                } else {
                    (video as HTMLVideoElement).src = window.URL.createObjectURL(stream); // for older browsers
                }
            }
        })
    }, []);

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
                toggleIsChatOn={() => setIsChatOn(!isChatOn)}
                partnerName={partnerName}
                isChatOn={isChatOn}
                messageBlocks={messageBlocks}
                partnerSpeciality={partnerSpeciality}
                partnerImagePath={partnerImagePath}
        />
    </Page>;
}

export default VideoChatPage;
