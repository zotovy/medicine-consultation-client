import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import controller from "../controllers/consultation-controller";
import {CameraIcon, MicroIcon, LeaveCallIcon} from "../icons";
import Button from "../components/consultation/main-button";
import UserVideo from "../components/consultation/user-video";
import Chat from "../components/consultation/chat";
import tokenServices from "../../../services/token-services";

interface IParams extends RouteComponentProps<{ id: string }> {
}

const ConsultationPage: React.FC<IParams> = ({ match, history }) => {


    useEffect(() => {
        let invalidTokenCounter = 0;

        const onSuccess = () => { invalidTokenCounter = 0; console.log("success"); };
        const onError = (data: string) => {
            console.log("error", data);
            switch (data) {
                case "invalid_token":
                    invalidTokenCounter += 1;
                    if (invalidTokenCounter == 1) {
                        tokenServices.getAndUpdateNewAccessToken().then(() => {
                            controller.socket?.close();
                            controller.setupSocket(match.params.id, { onSuccess, onError });
                        });
                    } else {
                        history.push("/");
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

        controller.fetchConsultation(match.params.id).catch(e => {
            console.log(e);
            // if (e === "not_authorize") history.goBack();
        });

        controller.onErrorCb = () => history.push("/error");
    }, []);



    return <div className="consultation-module">
        <div className="wrapper">
            <div className="video-container">
                {
                    controller.partnerConnected

                ?           <video playsInline muted={!controller.partnerMicroStatus} autoPlay id="partner-video" />
                        : <div className="not-connected">
                            <h3>Ваш собеседник еще не подключился</h3>
                        </div>
                }
            </div>
            <div className="buttons">
                <Button id="camera" ckey="isCameraOn">
                    <CameraIcon />
                </Button>
                <Button id="micro" ckey="isMicroOn" onClick={() => {
                    controller.isMicroOn = !controller.isMicroOn;
                    controller.socket?.emit("mute", controller.isMicroOn);
                }}>
                    <MicroIcon />
                </Button>
                <div
                    id="leave"
                    className={`button leave`}
                    onClick={() => {
                        controller.endCall();
                        history.goBack();
                    }}
                >
                    <LeaveCallIcon/>
                </div>
            </div>
        </div>
        <Chat />

        <UserVideo />
    </div>

};

export default withRouter(observer(ConsultationPage));