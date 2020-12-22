declare interface DoctorType extends UserType {
    _education: string;
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
    information?: string;
    price: number;
    workPlaces?: DoctorWorkplaceType[];
    education?: DoctorEducationType[];
    qualificationProofs?: DoctorQualificationDocumentType[];
}

declare type DoctorWorkplaceType = {
    fromYear: number;
    toYear: number;
    organisation: string;
    speciality: string;
}


// declare enum DoctorEducation {
//     Baccalaureate,  // Бакалавриат
//     Specialty,      // Специалитет
//     Master,         // Магистратура
// }

declare type DoctorEducationType = {
    year: number;
    institute: string;
    education: DoctorEducation;
}

declare type DoctorQualificationDocumentType = {
    imageUrl: string;
    name: string;
}
