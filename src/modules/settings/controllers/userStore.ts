import Consultation from "../../admin/types/consultation";

class UserStore {
    static user : UserType | DoctorType | null = null;
    static consultations : Consultation[] | null = null;
    static reviews : Review[] | null = null;
}

export default UserStore;