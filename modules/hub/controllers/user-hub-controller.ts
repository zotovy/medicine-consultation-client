import { injectable } from "inversify";
import { action, makeObservable, observable } from "mobx";
import HubService from "@/modules/hub/hub-service";

@injectable()
export default class UserHubController {

    constructor() {
        makeObservable(this);
    }

    @observable isLoading = true;
    @observable appoints: IAppointment[] = [];
    @observable appointsRequests: IAppointRequest[] = [];

    load = async (): Promise<void> => {
        this.isLoading = true;
        await action(async () => {
            await Promise.all([
                HubService.fetchAppointments(...UserHubController.uidAndRole).then(appoints => this.appoints = appoints),
                HubService.fetchAppointmentRequests(...UserHubController.uidAndRole).then(reqs => this.appointsRequests = reqs),
            ]);
            this.isLoading = false;
        })();
    }

    reject = (id: string): void => {
        HubService.rejectAppoint(id);
        this.appoints = this.appoints.filter(e => e._id !== id);
    }

    private static get uidAndRole(): [string, boolean] {
        const uid = localStorage.getItem("uid");
        const isUser = localStorage.getItem("isUser") ;
        if (!uid || !isUser) throw "logout";
        return [uid, isUser === "true"];
    }
}





