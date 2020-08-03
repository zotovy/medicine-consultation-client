declare interface IBecomeDoctor {
    id?: string;
    name?: string;
    surname?: string;
    phone?: string;
    email?: string;
    sex?: boolean;
    password?: string;
    education?: string;
    speciality?: string;
    yearEducation?: string;
    blankSeries?: string;
    blankNumber?: string;
    issueDate?: string | Date;
    passportIssuedByWhom?: string;
    passportSeries?: string;
    passportIssueDate?: string;
    workExperience?: string;
    workPlaces?: string;
}
