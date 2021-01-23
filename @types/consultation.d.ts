declare type Consultation = {
    id: string;
    patientId: string | UserType;
    doctorId: string | DoctorType;
    date: Date;
    note: string;
    messages?: any[];
    connected?: any[];
};
