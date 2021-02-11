import { injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";
import HubService from "@/modules/hub/hub-service";

@injectable()
export default class DoctorRequestHubController {

    constructor() {
        makeObservable(this);
    }

    @observable requests: IAppointRequest[] = [];
    @observable isLoading = true;

    @action load = async (): Promise<void> => {
        const uid = localStorage.getItem("uid");
        const isDoctor = localStorage.getItem("isUser") === "false";
        if (!uid || !isDoctor) throw "logout"

        await HubService.fetchAppointmentRequests(uid, false)
            .then(reqs => this.requests = reqs);

        this.isLoading = false;
    }

    @action confirmAppoint = (id: string): void => {
        this.removeRequest(id);
        HubService.confirmAppointRequest(id);
    }

    @action rejectAppoint = (id: string): void => {
        this.removeRequest(id);
        HubService.rejectAppointRequest(id);
    }

    @action private removeRequest = (id: string): void => {
        this.requests = this.requests.filter(e => e._id !== id);
    }
}

