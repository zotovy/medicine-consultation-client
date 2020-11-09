import Consultation from "../../admin/types/consultation";

class UserStore {
    static user : UserType | null = null;
    static consultations : Consultation[] | null = null;
}

export default UserStore;