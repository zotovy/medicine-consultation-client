import { observable, action } from "mobx";
import axios from "axios";
import { authFetch } from "../../../../../services/fetch_services";
import tokenServices from "../../../../../services/token-services";
class HubController {
    @observable showError: boolean = false;
    @observable arrAppointments: any = [];
    @observable _id: any = localStorage.getItem('uid');
    @observable name: any;
    @observable date: string = "";
    @observable showLoader: boolean = false;
    @observable numberRequest: number = 0;
    @observable infoForCard: any = [];
    @observable showCard: boolean = false;  
    @observable itemPosActive: number = 0;
    @observable showPopUp: boolean = false;    
    @observable showRequestsPage: boolean = false;

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
        this.onItemHandlerClick([])
        this.getAppoints(this._id)
    }

    @action public getAppoints = async (id: string) => {
        this.showLoader = true;
        this._id = id;
        return await this._fetchAppointments(id, this.date).then(
            action((arr = []) => {
                if(arr.appoints.length !== 0){
                    this.showCard = true;
                    this.infoForCard = arr.appoints[0];
                };
                return  this.arrAppointments = arr.appoints;
            })
        );
    };
    private _fetchAppointments = async (id: string, date: string): Promise<any> => {
        const response = await authFetch(() => axios.get(
            process.env.REACT_APP_SERVER_URL + `/api/doctor/${id}/appoints?numericDate=${date}`,
            {
                headers: {
                    auth: tokenServices.header
                }
            }
        ))
        .then((data: any) => {return data.data})
        .catch(() => {
            return { success: false };
        })
        if (!response.success) {
            return [];
        } else {
            this.showLoader = false;
        }
        return response
    };

    @action public getAppoinsRequest = async (id: string) => {
        return await this._fetchAppointmentsRequest(id).then(
            action((arr = []) => {
                return this.numberRequest = arr;
            })
        );
    };

    private _fetchAppointmentsRequest = async (id: string): Promise<any> => {
            const response = await authFetch(() => axios.get(
                process.env.REACT_APP_SERVER_URL + `/api/doctor/${id}/appoints-requests`,
                {
                    headers: {
                        auth: tokenServices.header
                    }
                }
            ))
            .then((data: any) => {return data.data})
            .catch(() => {
                return { success: false };
            })
            if (!response.success) {
                return [0];
            }
            return response
    };

    @action onItemHandlerClick = (info: [], pos: number = 0) => {
        this.itemPosActive = pos;
        if(info.length !== 0){
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
}
export default new HubController();
