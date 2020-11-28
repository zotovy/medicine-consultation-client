declare interface DoctorType extends UserType {
    education: string;
    yearEducation: [Date, Date];
    blankSeries: string;
    blankNumber: string;
    issueDate: Date;
    speciality: string[];
    beginDoctorDate: Date | null;
    experience: number;
    rating: number;
    whosFavourite: string[];
    clientsReviews: Review[];
    clientsConsultations: string[];
    sheldure: string[];
    vkLink?: string,
    instagramLink?: string,
    telegramLink?: string,
    whatsAppLink?: string,
    viberLink?: string,
    emailLink?: string,
}
