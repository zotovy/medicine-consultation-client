import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import styled from "styled-components";
import io from "socket.io-client";
import Peer from "peerjs";
import Selector from "@/modules/video-chat/selector";
import TokenServices from "@/services/token-services";

import NavigationComponent from "@/modules/video-chat/containers/navigation";
import PartnerVideoContainer from "@/modules/video-chat/containers/partner-video";
import ChatContainer from "@/modules/video-chat/containers/chat";
import { TMessage } from "@/modules/video-chat/types";
import { EMessageType } from "@/modules/consultations/controllers/consultation-controller";
import API from "@/modules/video-chat/api";
import PatientSideNotStartedConsultation from "@/modules/video-chat/containers/consultation-not-started/patient-side";
import DoctorSideNotStartedConsultation from "@/modules/video-chat/containers/consultation-not-started/doctor-side";

const Page = styled.main`
    width: 100vw;
    height: 100vh;
`;

let counterBadRequest = 0;

const setPartnerVideo = (stream: MediaStream) => {
    const video = document.querySelector<HTMLVideoElement>("video#partner-video") as HTMLVideoElement;
    if (video?.src != null) {
        if ("srcObject" in video) {
            video.srcObject = stream;
        } else {
            (video as HTMLVideoElement).src = window.URL.createObjectURL(stream); // for older browsers
        }
    }
}

const VideoChatPage: NextPage = () => {
    const router = useRouter();

    const [socket, setSocket] = useState<SocketIOClient.Socket>();
    const [peer, setPeer] = useState<Peer>();
    const [consultation, setConsultation] = useState<Consultation>();

    const [isCameraOn, setIsCameraOn] = useState(false);
    const [isMicroOn, setIsMicroOn] = useState(false);
    const [isChatOn, setIsChatOn] = useState(false);
    const [partnerName, setPartnerName] = useState("Ярослав Зотов");
    const [partnerSpeciality, setPartnerSpeciality] = useState("");
    const [partnerImagePath, setPartnerImagePath] = useState("");
    const [messages, setMessages] = useState<TMessage[]>([]);

    const [isPartnerConnected, setIsPartnerConnected] = useState(false);
    const [isPartnerMicroOn, setIsPartnerMicroOn] = useState(true);

    const isUser = localStorage.getItem("isUser") === "true";

    useEffect(() => {
        const uid = localStorage.getItem("uid");

        // fetching consultation
        API.fetchConsultation(router.query.id as string)
                .then(consultation => {
                    setConsultation(consultation);

                    const consultationMessages = consultation.messages.map(message => ({
                        type: EMessageType.Message,
                        message: message.message,
                        isUser: message.userId === uid,
                    }));

                    const isUser = localStorage.getItem("isUser") === "true";
                    if (isUser && typeof consultation?.doctor !== "string") {
                        setPartnerImagePath(consultation.doctor.photoUrl);
                        setPartnerName(consultation.doctor.fullName);
                        setPartnerSpeciality(
                                consultation.doctor.speciality.length >= 1
                                        ? consultation.doctor.speciality[0]
                                        : ""
                        );

                    } else if (typeof consultation?.patient !== "string") {
                        setPartnerImagePath(consultation.patient.photoUrl);
                        setPartnerName(consultation.patient.fullName);
                    }

                    setMessages([
                        ...consultationMessages,
                        {
                            isUser: true,
                            message: "",
                            type: EMessageType.ConnectMessage,
                        }
                    ])
                })
                .catch(e => {
                    throw e;
                });

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

        socketIo.on("error", async (error: string) => {
            if (error === "invalid_token" && counterBadRequest < 2) {
                counterBadRequest += 1;
                await TokenServices.getAndUpdateNewAccessToken();
                socketIo.disconnect();
                socketIo.connect();
            } else if (counterBadRequest >= 2) {
                router.push("/login");
            }
        });

        socketIo.on("success", async () => {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });

            const peer = new Peer({
                host: process.env.PEER_SERVER_URL,
                port,
                path: "/mc",
                secure: true,
            });

            peer.on("open", (id) => {
                console.log("open");
                socketIo.emit("user-connected", id);
            });
            setPeer(peer);

            peer.on("call", (call) => {
                setIsPartnerConnected(true);
                call.answer(stream);

                call.on("stream", (partnerStream) => setPartnerVideo(partnerStream));
            });

            socketIo.on("user-connected", (userId: string) => {
                console.log("user-connected", userId);
                setMessages([
                    ...messages,
                    {
                        isUser: userId === localStorage.getItem("uid"),
                        type: EMessageType.ConnectMessage,
                        message: "",
                    }
                ]);

                const call = peer.call(userId, stream);

                call.on("stream", (partnerStream) => {
                    setIsPartnerConnected(true);
                    setPartnerVideo(partnerStream);

                    socketIo.on("disconnected", () => {
                        call.close();
                        setIsPartnerConnected(false);
                        setMessages([
                            ...messages,
                            {
                                isUser: userId === localStorage.getItem("uid"),
                                type: EMessageType.DisconnectMessage,
                                message: "",
                            }
                        ]);
                    });
                });
            });
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

        socketIo.on("mute", (status: boolean) => setIsPartnerMicroOn(status));

        let port = 5001;
        if (process.env.PEER_SERVER_PORT != "default") {
            port = parseInt(process.env.PEER_SERVER_PORT ?? "");
        }

        return () => {
            socketIo.disconnect();
        }
    }, []);

    if (!socket || !peer || !consultation) return <React.Fragment/>;

    if (consultation.status === "not_started") {
        if (isUser) return <PatientSideNotStartedConsultation startDate={consultation.date}/>
        else return <DoctorSideNotStartedConsultation/>
    }

    return <Page>
        <Head>
            <title>Видео консультация</title>
        </Head>
        <PartnerVideoContainer isMicroOn={isPartnerMicroOn}/>
        <NavigationComponent
                isCameraOn={isCameraOn}
                isMicroOn={isMicroOn}
                isChatOn={isChatOn}
                onTriggerCamera={() => setIsCameraOn(!isCameraOn)}
                onTriggerMicro={() => {
                    setIsMicroOn(!isMicroOn);
                    socket.emit("mute", isMicroOn);
                }}
                onTriggerChat={() => setIsChatOn(!isChatOn)}/>

        <ChatContainer
                sendMessage={(v) => {
                    setMessages([
                        ...messages,
                        {
                            isUser: true,
                            message: v,
                            type: EMessageType.Message
                        }
                    ]);

                    socket?.emit(
                            "new_message",
                            v,
                            localStorage.getItem("uid")
                    );
                }}
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
