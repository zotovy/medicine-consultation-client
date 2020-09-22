import React, { useState, useEffect, useRef } from "react";
import { reaction } from "mobx";
import controller from "../controller/consultation-controller";
import { observer } from "mobx-react";
import { CameraIcon, MicroIcon, ChatIcon } from "../icons";
import { CloseIcon } from "../../doctors/icons";
import Button from "../components/consultation/main-button";
import PartnerVideo from "../components/consultation/partner-video";



const ConsultationPage: React.FC = () => {
    const userVideo = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then(stream => {
                if (userVideo.current) {
                    userVideo.current.srcObject = stream;
                }
            })
            .catch(() => null)
    }, []);

    return <div className="consultation-module">
        <div className="video-container">
            {
                userVideo ? <video playsInline muted autoPlay ref={userVideo} className={controller.isCameraOn ? "" : "hidden"} /> : <h1>123</h1>
            }
        </div>
        <div className="buttons">
            <Button id="camera" ckey="isCameraOn">
                <CameraIcon />
            </Button>
            <Button id="micro" ckey="isMicroOn">
                <MicroIcon />
            </Button>
            <Button id="chat" ckey="isChatOn">
                <ChatIcon />
            </Button>
        </div>

        <PartnerVideo />
    </div>

};

export default observer(ConsultationPage);