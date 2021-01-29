import React from 'react';
import { observer } from "mobx-react";
import { CloseIcon } from '@/modules/doctors/icons';
import ConsultationController from "@/modules/consultations/controllers/consultation-controller";
import { MicroSlashIcon, RefreshIcon } from '../../icons';
import { TYPES, useInjection } from "container";

const UserVideo: React.FC = () => {
    const controller = useInjection<ConsultationController>(TYPES.consultationController);
    const styles = controller.partnerImagePath ? { backgroundImage: `url(${controller.partnerImagePath})` } : {};
    const videoStyles = {display: controller.isCameraOn ? "block" : "none"};

    return <div className="user" style={videoStyles}>
        <div className="user-wrapper">
            <video playsInline autoPlay muted id="user-video"  />

            {
                !controller.isMinimized || window.screen.width > 425
                    ? <React.Fragment>
                        <div className="close" onClick={() => controller.isMinimized = true}>
                            <CloseIcon />
                        </div>
                        {
                            !controller.isMicroOn
                                ? <div className="micro">
                                    <MicroSlashIcon />
                                </div>
                                : <React.Fragment />
                        }
                    </React.Fragment>
                    : <div className="minimized" style={styles} onClick={() => controller.isMinimized = false}/>
            }

            <div className="flip">
                <RefreshIcon/>
            </div>
        </div>
    </div>
}

export default observer(UserVideo);