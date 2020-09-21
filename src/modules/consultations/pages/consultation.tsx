import React, { useState, useEffect, useRef } from "react";
import { CameraIcon, MicroIcon, ChatIcon } from "../icons";

const ConsultationPage: React.FC = () => {
    const [stream, setStream] = useState<MediaStream>();
    const userVideo = useRef<HTMLVideoElement>(null);

    // const videoStyles = { height: window.innerHeight + "px" };

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then(stream => {
                setStream(stream);
                if (userVideo.current) {
                    userVideo.current.srcObject = stream;
                }
            })
            .catch(e => null)
    }, []);

    return <div className="consultation-module">
        <div className="video-container">
            <video playsInline muted autoPlay ref={userVideo} />
        </div>
        <div className="buttons">
            <div className="button active" id="camera">
                <CameraIcon />
            </div>
            <div className="button" id="micro">
                <MicroIcon />
            </div>
            <div className="button" id="chat">
                <ChatIcon />
            </div>
        </div>
    </div>

};

export default ConsultationPage;