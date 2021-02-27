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
import PatientSideNotStartedConsultation from "@/modules/video-chat/containers/consultation-status/patient-side";
import DoctorSideNotStartedConsultation from "@/modules/video-chat/containers/consultation-status/doctor-side";
import ConsultationFinished from "@/modules/video-chat/containers/consultation-status/consultation-finished";

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

    const [isCameraOn, setIsCameraOn] = useState(true);
    const [isMicroOn, setIsMicroOn] = useState(true);
    const [isChatOn, setIsChatOn] = useState(false);
    const [partnerName, setPartnerName] = useState("Ярослав Зотов");
    const [partnerSpeciality, setPartnerSpeciality] = useState("");
    const [partnerImagePath, setPartnerImagePath] = useState("");
    const [messages, setMessages] = useState<TMessage[]>([]);

    const [isPartnerConnected, setIsPartnerConnected] = useState(false);
    const [isPartnerMicroOn, setIsPartnerMicroOn] = useState(true);
    const [isPartnerCameraOn, setIsPartnerCameraOn] = useState(true);
    const [partnerStream, setPartnerStream] = useState<MediaStream>();

    const isUser = localStorage.getItem("isUser") === "true";

    useEffect(() => {
        const uid = localStorage.getItem("uid");

        // fetching consultation
        API.fetchConsultation(router.query.id as string)
                .then(async consultation => {

                    const timeDelta = consultation.date.getTime() - new Date().getTime();
                    if (timeDelta > 10800000) consultation.status = "finished";

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
                    ]);

                    socketIo.on("start-consultation", () => {
                        if (!consultation) return;
                        // const id = localStorage.getItem("uid");
                        setConsultation({
                            ...consultation,
                            status: "started",
                        });

                        const partner = localStorage.getItem("isUser") === "true"
                                ? consultation.doctor
                                : consultation.patient

                        setIsPartnerConnected(consultation.connected?.includes(partner) ?? false);
                    });

                    socketIo.on("finish-consultation", () => {
                        if (!consultation) return;
                        setConsultation({
                            ...consultation,
                            status: "finished",
                        });
                    });

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
                        socketIo.emit("user-connected", id);
                    });
                    setPeer(peer);

                    peer.on("call", (call) => {
                        console.log("call");

                        setIsPartnerConnected(consultation?.status === "started");
                        call.answer(stream);
                        call.on("stream", (stream) => {
                            setPartnerStream(stream);
                            setPartnerVideo(stream);
                        });
                    });

                    socketIo.on("user-connected", (userId: string) => {
                        setMessages([
                            ...messages,
                            {
                                isUser: userId === localStorage.getItem("uid"),
                                type: EMessageType.ConnectMessage,
                                message: "",
                            }
                        ]);
                        setIsPartnerConnected(true);

                        const call = peer.call(userId, stream);

                        call.on("stream", (partnerStream) => {
                            console.log("setIsPartnerConnected", consultation?.status === "started", consultation?.status);
                            setIsPartnerConnected(consultation?.status === "started");
                            setPartnerVideo(partnerStream);
                            setPartnerStream(partnerStream);

                            socketIo.on("disconnected", () => {
                                call.close();
                                setIsPartnerConnected(consultation?.status === "started");
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

                    socketIo.on("disconnected", () => {
                       setIsPartnerConnected(false);
                    });
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

        socketIo.on("mute", (status: boolean) => {
            setIsPartnerMicroOn(status)
        });

        socketIo.on("change-camera-status", (status: boolean) => {
            setIsPartnerCameraOn(status);
        });

        let port = 5001;
        if (process.env.PEER_SERVER_PORT != "default") {
            port = parseInt(process.env.PEER_SERVER_PORT ?? "");
        }

        return () => {
            socketIo.disconnect();
        }
    }, []);

    useEffect(() => {
        if (consultation && consultation.status === "started" && partnerStream) {
            setPartnerVideo(partnerStream);
        }
    }, [consultation]);

    if (!socket || !peer || !consultation) return <React.Fragment/>;

    if (consultation.status === "not_started") {
        if (isUser) return <React.Fragment>
            <PatientSideNotStartedConsultation startDate={consultation.date}/>
            <PartnerVideoContainer
                    isPartnerConnected={isPartnerConnected}
                    isPartnerCameraOn={isPartnerCameraOn}
                    isMicroOn={isPartnerMicroOn}
                    hidden={!isPartnerConnected}/>
        </React.Fragment>
        else return <React.Fragment>
            <DoctorSideNotStartedConsultation
                    startDate={consultation.date}
                    startConsultation={() => {
                        const consultationId = router.query.id;
                        const doctorId = localStorage.getItem("uid");
                        if (localStorage.getItem("isUser") !== "false") return;
                        socket.emit("start-consultation", consultationId, doctorId);
                        setIsPartnerConnected(true);
                        setConsultation({
                            ...consultation,
                            status: "started",
                        });
                    }}/>
            <PartnerVideoContainer
                    isPartnerConnected={false}
                    isPartnerCameraOn={isPartnerCameraOn}
                    isMicroOn={isPartnerMicroOn}
                    hidden={!isPartnerConnected}/>
        </React.Fragment>
    }

    if (consultation.status === "finished") {
        return <ConsultationFinished/>
    }

    return <Page>
        <Head>
            <title>Видео консультация</title>
        </Head>
        <PartnerVideoContainer
                isPartnerConnected={isPartnerConnected}
                isPartnerCameraOn={isPartnerCameraOn}
                isMicroOn={isPartnerMicroOn}
                hidden={!isPartnerConnected} />
        <NavigationComponent
                isCameraOn={isCameraOn}
                isMicroOn={isMicroOn}
                isChatOn={isChatOn}
                onTriggerCamera={() => {
                    setIsCameraOn(!isCameraOn);
                    socket.emit("change-camera-status", !isCameraOn);
                }}
                onTriggerMicro={() => {
                    setIsMicroOn(!isMicroOn);
                    socket.emit("mute", !isMicroOn);
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
