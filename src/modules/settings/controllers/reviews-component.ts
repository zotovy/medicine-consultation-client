import { observable } from "mobx";

class ReviewsComponent {
    // General
    @observable status: "user" | "doctor" = "doctor";
    @observable isLoading: boolean = true;

    // Reviews
    @observable reviews : Review[] = [];



}

export default new ReviewsComponent();