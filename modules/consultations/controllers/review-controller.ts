import { injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";
import ConsultationManager from "@/modules/consultations/manager";

@injectable()
export default class ReviewController {

    constructor() {
        makeObservable(this);
    }

    fetching = true;
    consultation: Consultation | null = null;

    @observable point = 0;
    content = "";

    @action async load(id: string): Promise<void> {
        this.consultation = await ConsultationManager.fetchConsultation(id);
        this.fetching = false;
    }

    @action async saveReview(): Promise<void> {
        if (!this.consultation) return;
        console.log(this.consultation);

        await ConsultationManager.writeReview({
            consultationId: this.consultation._id,
            content: this.content,
            doctorId: (this.consultation.doctor as DoctorType)._id as string,
            point: this.point,
            userId: (this.consultation.patient as UserType)._id as string,
        });
    }
}
