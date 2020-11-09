export default interface Consultation {
    id?: string;
    patientId?: string | UserType;
    doctorId?: string | DoctorType;
    date?: Date;
    note?: string;
}
