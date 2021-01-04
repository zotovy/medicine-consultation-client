import { observable, action } from "mobx";
import axios from "axios";

// type arrAppointment = {
//     from: string;
//     to: string;
//     consulation: {
//         patient: {
//             name:string;
//             suranme: string;
//             patronymic: string;
//         }
//     }
// }
class HubController {
    @observable showError: boolean = false;
    @observable arrAppointments: any[] = [];
    @observable _id: any;
    @observable name: any;

    @action public getAppoints = async (id: string) => {
        return await this._fetchAppointments(id).then(
            action((arr = []) => {
                return this.arrAppointments = arr;
            })
        );
    };
    private _fetchAppointments = async (id: string): Promise<any> => {
        const response = await axios
            .get(
                process.env.REACT_APP_SERVER_URL +
                `/doctor/${id}/appoints`
            )
            .then((data: any) => data.data)
            .catch(() => {
                return { success: false };
            });
            // if(!response.success || response.lenght == 0){
            //     return this.showError = true;
            // }
        return await response.symptoms;
    };

    @action public getAppoinsRequest = async (id: string) => {
        return await this._fetchAppointmentsRequest(id).then(
            action((arr = []) => {
                return this.arrAppointments = arr;
            })
        );
    };

    private _fetchAppointmentsRequest = async (id: string): Promise<any> => {
        const response = await axios
            .get(
                process.env.REACT_APP_SERVER_URL +
                `/doctor/${id}/appoints-requests`
            )
            .then((data: any) => data.data)
            .catch(() => {
                return { success: false };
            });
            if(!response.success || response.lenght == 0){
                console.error('error')
            }
        return await response.symptoms;
    };
    
    @action handlerCalendarClick = async (date:Date) => {
        console.log("1-"+date)
        let date2 = new Date(date);
        console.log("2-"+date2)
    };
}
export default new HubController();
