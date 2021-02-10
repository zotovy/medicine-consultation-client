import { injectable } from "inversify";
import { action, makeObservable, observable, toJS } from "mobx";
import HubService from "@/modules/hub/hub-service";
import FormatServices from "@/services/format-services";

@injectable()
export default class DoctorHubController {

    constructor() {
        makeObservable(this);
    }

    @observable isLoading = true;
    @observable appoints: IAppointment[] = [];
    @observable appointsRequests: IAppointRequest[] = [];
    @observable appointsDates: Date[] = [];
    @observable selectedDate: Date = new Date();
    @observable selectedAppoint: IAppointment | null = null;

    private cache: Cache = {
        appoints: {},
    }

    @action load = async (): Promise<void> => {
        this.isLoading = true;
        const date = new Date();

        await Promise.all([
            HubService.fetchAppointmentsDates(this.uid, date)
                .then(appoints => this.appointsDates = appoints),
            HubService.fetchAppointments(this.uid, false, date)
                .then(appoints => this.appoints = appoints),
            HubService.fetchAppointmentRequests(this.uid, false)
                .then(requests => this.appointsRequests = requests),
        ]);

        // save to cache
        this.cache.appoints[FormatServices.formatDate(date)] = toJS(this.appoints);

        this.isLoading = false;
    }

    @action loadAppoints = async (date: Date): Promise<void> => {
        // trying to find cached appoints
        const cache = this.cache.appoints[FormatServices.formatDate(date)];
        if (cache) {
            this.appoints = cache;
            return;
        }

        // load
        await HubService.fetchAppointments(this.uid, false, date)
            .then(appoints => this.appoints = appoints);

        // save to cache
        this.cache.appoints[FormatServices.formatDate(date)] = toJS(this.appoints);
    }

    @action selectAppoint = (id: string | null): void => {
        this.selectedAppoint = this.appoints.find(e => e._id === id) ?? null;
    }

    private get uid() {
        return localStorage.getItem("uid") as string;
    }
}

type Cache = {
    appoints: {
        [key: string]: IAppointment[]
    }
}
