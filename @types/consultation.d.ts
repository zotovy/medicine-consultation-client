declare type Consultation = {
    _id: string;
    patient: string | UserType;
    doctor: string | DoctorType;
    date: Date;
    note: string;
    messages: any[];
    connected?: any[];
    status: "not_started" | "waiting_for_doctor" | "started" | "finished",
    wroteReview: boolean,
};

declare type ConsultationDocument = {
    path: string;
    type: "img" | "pdf" | "file";
    size: string;
    name: string;
}
