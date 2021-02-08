import { observable, action, makeObservable } from "mobx";
import axios from "axios";
import { authFetch } from "@/services/fetch_services";
import TokenServices from "@/services/token-services";
import { injectable } from "inversify";
import HubService from "@/modules/hub/hub-service";

@injectable()
export default class HubController {

    constructor() {
        makeObservable(this);
    }

    @observable showError: boolean = false;
    @observable arrAppointments: IAppointment[] = [];
    @observable _id: any = typeof window !== 'undefined' ? localStorage.getItem('uid') : null;
    @observable name: any;
    @observable date: Date = new Date();
    @observable isLoading: boolean = false;
    @observable consRequest: IAppointRequest[] = [];
    @observable infoForCard: any = [];
    @observable showCard: boolean = false;  
    @observable itemPosActive: number = 0;
    @observable itemPosActive768: any = 2;
    @observable showPopUp: boolean = false;    
    @observable showRequestsPage: boolean = false;
    @observable shortDate: string = `${new Date().getMonth() + 1 > 10 ? `${new Date().getMonth() + 1}` : `0${new Date().getMonth() + 1}` }.${new Date().getFullYear()}`;
    @observable appointsDates: Date[] = [];
    @observable userArrAppointments: any = [];
    @observable userArrRequestAppointments: any = [];

    @action setDate = (sD: Date) => {
        let formatDate = sD;
        if (sD.getFullYear() === 1000) {
            formatDate = new Date();
        }
        let day = formatDate.getDate().toString(),
            month = (formatDate.getMonth() + 1).toString();
        if (day.length === 1) {
            day = "0" + day;
        }
        if (month.length === 1) {
            month = "0" + month;
        }
        this.date = `${day}.${month}.${formatDate.getFullYear()}`;
        this.shortDate = `${month}.${formatDate.getFullYear()}`;
        if(window.innerWidth <= 768){
            this.onItemHandlerClick([],-1);
        }else{
            this.onItemHandlerClick([]);
        }
        
        this.getAppointsDate(this._id);
        this.getAppoints(this._id);
    }

    @action public getAppointsDate = async (id: string) => {
        await HubService.fetchAppointmentsDate(id, new Date()).then(
            action((dates: Date[]) => this.appointsDates = dates)
        );
    };

    @action public getAppoints = async (id: string) => {
        this.isLoading = true;
        this._id = id;
        await HubService.fetchAppointments(id, this.date, false).then(
            action((appointments: IAppointment[]) => {
                if (appointments.length !== 0) {
                    if (typeof window !== "undefined" && window.innerWidth >= 768) {
                        this.showCard = true;
                    }
                    this.infoForCard = appointments[0];
                }
            })
        );
    };

    @action public getAppointsRequest = async (id: string) => {
        HubService.fetchAppointmentRequests(id, false).then(
            action((requests: IAppointRequest[]) => this.consRequest = requests)
        );
    };


    @action onItemHandlerClick = (info: [] = [], pos: number = 0) => {
        this.itemPosActive = pos;
        this.itemPosActive768 = pos;
        if(info.length !== 0 && pos !== -1){
            this.showCard = true;
            this.infoForCard = info;
        }else{
            this.showCard = false;
        }
    } 
    @action closePopUp = () => {
        console.log(this.showPopUp)
        this.showPopUp = false;
    }
    @action openPopUp = () => {
        this.showPopUp = true;
    }
    @action openRequestsPage = () => {
        this.showRequestsPage = true;
    }
    @action closeRequestsPage = () => {
        this.showRequestsPage = false;
    }

    @action confirmRequest = async (id: string) : Promise<any> => {
        await HubService.confirmAppointRequest(id);
        this.consRequest = this.consRequest.filter(e => e._id !== id);
    }

    @action rejectRequest = async (id: string) : Promise<any> => {
        await HubService.rejectAppointRequest(id);
        this.consRequest = this.consRequest.filter(e => e._id !== id);
    }

    @action rejectConsultation = async (id: string) : Promise<any> => {
        await HubService.rejectAppoint(id);
        this.arrAppointments = this.arrAppointments.filter(e => e._id !== id);
    }
    @action userGetAppoints = async (id: string) => {
        this.isLoading = true;
        this._id = id;
        await HubService.fetchAppointments(id, this.date, true).then(
            action((appoints: IAppointment[]) => {
                this.userArrAppointments = appoints;
                this.isLoading = false;
            })
        );
    };

    @action userGetRequestAppoints = async (id: string) => {
        this.isLoading = true;
        this._id = id;
        await HubService.fetchAppointmentRequests(id, true).then(
            action((requests: IAppointRequest[]) => {
                this.isLoading = false;
                this.userArrRequestAppointments = requests;
            })
        )
    };
    
    @action closeCard = () => {
        this.showCard = false
    }
}
