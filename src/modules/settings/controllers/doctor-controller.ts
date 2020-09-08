import { observable } from "mobx";
import Time from "../../../utils/time";
import Duration from "../../../utils/duration";

class DoctorSettingsController {
    @observable private _startConsultationAt = new Time(9, 0);
    @observable private _endConsultationAt = new Time(22, 0);
    @observable private _consultationTime = new Duration(50);

    get startConsultationAt(): Time {
        return this._startConsultationAt;
    }
    get endConsultationAt(): Time {
        return this._endConsultationAt;
    }

    get consultationTime(): Duration {
        return this._consultationTime;
    }
}

export default new DoctorSettingsController();
