declare type TConsultation = {
    id: string;
    patientId: string | UserType;
    doctorId: string | DoctorType;
    date: Date;
    note: string;
    messages?: any[];
    connected?: any[];
};
