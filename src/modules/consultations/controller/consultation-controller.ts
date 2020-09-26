import { observable } from "mobx";

class ConsultationController implements IConsultationController {
    @observable isCameraOn: boolean = true;
    @observable isMicroOn: boolean = false;
    @observable isChatOn: boolean = true;

    // partner
    @observable isMinimized: boolean = false;
    @observable partnerImagePath?: string;
    @observable partnerMicroStatus: boolean = false;
    @observable partnerName: string = "Иванова Елена";
    @observable partnerSpeciality: string = "Педиатр";
}

export interface IConsultationController {
    isCameraOn: boolean;
    isMicroOn: boolean;
    isChatOn: boolean;
}

export default new ConsultationController();
