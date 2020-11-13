declare interface Review {
    patientId: {
        _id: string;
        name: string;
        surname: string;
        photoUrl: string;
    } | string;
    doctorId: string | DoctorType;
    content: string;
    point: number;
    timestamp: Date;
}
