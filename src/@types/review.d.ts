declare interface Review {
    patientId: {
        _id: string;
        name: string;
        surname: string;
        photoUrl: string;
    } | string;
    doctorId: string;
    content: string;
    point: number;
    timestamp: Date;
}
