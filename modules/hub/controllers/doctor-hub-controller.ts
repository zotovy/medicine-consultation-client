import { injectable } from "inversify";
import { action, makeObservable, observable, toJS } from "mobx";
import HubService from "@/modules/hub/hub-service";
import FormatServices from "@/services/format-services";
import { DoctorHubLoadProps } from "@/modules/hub/types";
import * as Url from "url";

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

    @observable selectAnyAppoint = false;

    private cache: Cache = {
        appoints: {},
    }

    @action load = async (query: DoctorHubLoadProps): Promise<void> => {
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

        // check query url and change selectedAppoint state if something selected
        if (query?.selected) {
            this.selectedAppoint = await HubService.fetchAppointById(query.selected).catch(() => null);
            console.log(toJS(this.selectedAppoint));
            this.selectAnyAppoint = !!this.selectedAppoint;
        }

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
        if (id) {
            const url = new URL(document.location.href);
            url.searchParams.set("selected", id);
            window.history.pushState({ path: url.href }, "", url.href);
        }

        if (window && window.screen.width <= 768) {
            setTimeout(() => this.selectAnyAppoint = true, 100);
        } else {
            this.selectAnyAppoint = true;
        }
    }

    @action rejectAppoint = (id: string): void => {
        const appoint = this.appoints.find(e => e._id == id);
        if (!appoint) return;

        // remove appoint
        this.appoints = this.appoints.filter(e => e._id !== id);

        // if appoint was a single on date --> remove appointDate
        if (this.appoints.findIndex(e => e.numericDate === appoint.numericDate) === -1) {
            this.appointsDates = this.appointsDates.filter(e => this.numericMonthAndYear(e) !== appoint.numericDate);
        }

        // if appoint was selected -> unselect
        if (this.selectedAppoint?._id === appoint._id) {
            this.selectedAppoint = null;
            this.selectAnyAppoint = false;

            // remove from query in URL
            const url = new URL(document.location.href);
            url.searchParams.delete("selected");
            window.history.pushState({ path: url.href }, "", url.href);
        }

        // update cache
        this.cache.appoints[FormatServices.formatDate(appoint.from)] = this.appoints;

        // send a request to remove this appoint on server
        HubService.rejectAppoint(id);
    }

    private get uid() {
        return localStorage.getItem("uid") as string;
    }

    private numericMonthAndYear = (date: Date) => {
        let month = (date.getMonth() + 1).toString(),
            day = date.getDate().toString();
        if (month.length === 1) month = "0" + month;
        if (day.length === 1) day = "0" + day;
        return `${day}.${month}.${date.getFullYear()}`;
    }
}

type Cache = {
    appoints: {
        [key: string]: IAppointment[]
    }
}
