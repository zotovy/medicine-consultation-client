declare type Consultation = {
    id: string;
    patientId: string | UserType;
    doctorId: string | DoctorType;
    date: Date;
    note: string;
    messages?: any[];
    connected?: any[];
};

declare type ConsultationDocument = {
    path: string;
    type: "img" | "pdf" | "file";
    size: string;
    name: string;
}
