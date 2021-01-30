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
    @observable consRequest: any = [];
    @observable infoForCard: any = [];
    @observable showCard: boolean = false;  
    @observable itemPosActive: number = 0;
    @observable itemPosActive768: any = 2;
    @observable showPopUp: boolean = false;    
    @observable showRequestsPage: boolean = false;
    @observable shortDate: string = "";
    @observable arrDates: [] = [];
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
        return await this._fetchAppointmentsDate(id,this.shortDate).then(
            action((arr = []) => {
                console.log(arr.dates)
                return  this.arrDates = arr.dates;
            })
        );
    };
    private _fetchAppointmentsDate = async (id: string, date: string): Promise<any> => {
        const response = await authFetch(() => axios.get(
            process.env.REACT_APP_SERVER_URL + `/api/doctor/get-consultations-dates/${date}`,
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
        }
        return response
    };
    @action public getAppoints = async (id: string | null) => {
        this.showLoader = true;
        this._id = id;
        return await this._fetchAppointments(id, this.date).then(
            action((arr = []) => {
                if(arr.appoints !== undefined){
                    if(arr.appoints.length !== 0){
                        if(window.innerWidth >= 768){
                            this.showCard = true;
                        }
                        this.infoForCard = arr.appoints[0];
                    };
                }
                return  this.arrAppointments = arr.appoints;
            })
        );
    };
    private _fetchAppointments = async (id: string | null, date: string): Promise<any> => {
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

    @action public getAppoinsRequest = async (id: string | null) => {
        return await this._fetchAppointmentsRequest(id).then(
            action((arr = []) => {
                return this.consRequest = arr.requests;
            })
        );
    };

    private _fetchAppointmentsRequest = async (id: string | null): Promise<any> => {
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

    @action confirmRequest = async (appointId: string) : Promise<any> => {
        const uid = localStorage.getItem("uid");
        const result = await authFetch(() => axios.post(
            process.env.REACT_APP_SERVER_URL + `/api/doctor/${uid}/appoint/${appointId}/confirm`,
            {},
            {
                headers: {
                    auth: tokenServices.header
                }
            }
        ))
        .then((data: any) => {this.getAppoinsRequest(uid); return data.data})
        .catch(() => {
            return { success: false };
        });
        if (result.success){
            this.getAppoinsRequest(uid);
        }
    }
    @action rejectRequest = async (appointId: string) : Promise<any> => {
        const uid = localStorage.getItem("uid");
        const result = await authFetch(() => axios.post(
            process.env.REACT_APP_SERVER_URL + `/api/doctor/${uid}/appoint/${appointId}/reject`,
            {},
            {
                headers: {
                    auth: tokenServices.header
                }
            }
        ))
        .then((data: any) => {return data.data})
        .catch(() => {
            return { success: false };
        });
        if (result.success){
            this.getAppoinsRequest(uid);
        }
    }
    @action rejectConsultation = async (consultationId: string) : Promise<any> => {
        const uid = localStorage.getItem("uid");
        const result = await authFetch(() => axios.post(
            process.env.REACT_APP_SERVER_URL + `/api/doctor/${uid}/consultation/${consultationId}/reject`,
            {},
            {
                headers: {
                    auth: tokenServices.header
                }
            }
        ))
        .then((data: any) => {return data.data})
        .catch(() => {
            return { success: false };
        });
        if (result.success){
            this.closePopUp();
            this.getAppoints(uid);
        }
    }
    @action userGetAppoints = async (id: string | null) => {
        this.showLoader = true;
        this._id = id;
        return await this._fetchUserAppointments(id).then(
            action((arr = []) => {
                console.log(arr)
                return  this.userArrAppointments = arr.appoints;
            })
        );
    };
    private _fetchUserAppointments = async (id: string | null): Promise<any> => {
        const response = await authFetch(() => axios.get(
            process.env.REACT_APP_SERVER_URL + `/api/user/${id}/appoints`,
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
    @action userGetRequestAppoints = async (id: string | null) => {
        this.showLoader = true;
        this._id = id;
        return await this._fetchUserRequestAppointments(id).then(
            action((arr = []) => {
                console.log(arr)
                return  this.userArrRequestAppointments = arr.requests;
            })
        );
    };
    private _fetchUserRequestAppointments = async (id: string | null): Promise<any> => {
        const response = await authFetch(() => axios.get(
            process.env.REACT_APP_SERVER_URL + `/api/user/${id}/appoints`,
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
    @action closeCard = () => {
        this.showCard = false
    }
}
export default new HubController();
