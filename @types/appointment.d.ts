declare interface IAppointment {
    _id: string;
    from: Date;
    to: Date;
    consultation: Consultation | string;
    patientName: string;
    phone: number;
    birthday: Date;
    sex: boolean;
    chronicDiseases?: string;
    symptoms?: string;
    documents?: ConsultationDocument[];
    numericDate: string;
}

declare interface IAppointRequest {
    _id: string;
    patient: string | IUser;
    doctor: string | IDoctor;
    createdAt: Date;
    appointment: string | IAppointment;
}
