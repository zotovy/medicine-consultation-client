import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import controller from "../controller/consultation-controller";
import { CameraIcon, MicroIcon, ChatIcon } from "../icons";
import Button from "../components/consultation/main-button";
import UserVideo from "../components/consultation/user-video";
import Chat from "../components/consultation/chat";
import tokenServices from "../../../services/token-services";

interface IParams extends RouteComponentProps<{ id: string }> {
}

const ConsultationPage: React.FC<IParams> = ({ match, history }) => {
    const userVideo = useRef<HTMLVideoElement>(null);
    useEffect(() => {

        let invalidTokenCounter = 0;

        const onSuccess = () => { invalidTokenCounter = 0; console.log("success"); };
        const onError = (data: string) => {
            console.log("error", data);
            switch (data) {
                case "invalid_token":

                    invalidTokenCounter += 1;
                    if (invalidTokenCounter == 1) {
                        tokenServices.getAndUpdateNewAccessToken().then(() => controller.setupSocket(match.params.id, { onSuccess, onError }));
                    }
                    break;
                default:
                    history.push("/");
            }
        };


        controller.setupSocket(match.params.id, { onSuccess, onError }).then(next => {
            switch (next) {
                case "redirect":
                    history.push("/");
                    break;
                case "redirect-login":
                    history.push("/login");
                    break;
                case "ok":
                    break;
            }
        });

    }, []);

    return <div className="consultation-module">
        <div className="wrapper">
            <div className="video-container">
                {
                    userVideo ? <video playsInline muted autoPlay id="partner-video" className={controller.isCameraOn ? "" : "hidden"} /> : <h1>123</h1>
                }
            </div>
            <Chat />
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

        <UserVideo />
    </div>

};

export default withRouter(observer(ConsultationPage));