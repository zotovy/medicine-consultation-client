import { observable } from "mobx";

class ConsultationController implements IConsultationController {
    @observable isCameraOn: boolean = false;
    @observable isMicroOn: boolean = false;
    @observable isChatOn: boolean = false;

    // partner
    @observable isMinimized: boolean = false;
    @observable partnerImagePath?: string;
    @observable partnerMicroStatus: boolean = false;
}

export interface IConsultationController {
    isMinimized: boolean;
    isCameraOn: boolean;
    isMicroOn: boolean;
    isChatOn: boolean;
}

export default new ConsultationController();
