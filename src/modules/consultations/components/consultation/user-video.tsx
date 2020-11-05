import React, { useEffect, useRef } from 'react';
import { observer } from "mobx-react";
import { CloseIcon } from '../../../doctors/icons';
import controller from "../../controllers/consultation-controller";
import { MicroSlashIcon } from '../../icons';
import userPlaceholder from "../../../../static/images/user-placeholder.jpg";

const UserVideo: React.FC = () => {
    const styles = controller.partnerImagePath ? { backgroundImage: `url(${controller.partnerImagePath})` } : {};
    const videoStyles = {display: controller.isCameraOn ? "block" : "none"};

    return <div className="user" style={videoStyles}>
        <div className="user-wrapper">
            <video playsInline autoPlay muted id="user-video"  />

            {
                !controller.isMinimized
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
        </div>
    </div>
}

export default observer(UserVideo);