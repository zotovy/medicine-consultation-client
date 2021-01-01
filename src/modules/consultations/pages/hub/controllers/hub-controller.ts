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

    @action public onHubReady = async (id: string = "5fe98b597c4d6207627c1097") => {
        return await this._fetchAppointments(id).then(
            action((arr = []) => {
                return this.arrAppointments = arr;
            })
        );
    };
    private _fetchAppointments = async (id: string = "5fe98b597c4d6207627c1097"): Promise<any> => {
        console.log(1)
        const response = await axios
            .get(
                process.env.REACT_APP_SERVER_URL +
                `/doctor/${JSON.stringify(id)}/appoints`
            )
            .then((data: any) => data.data)
            .catch(() => {
                return { success: false };
            });
            if(!response.success || response.lenght == 0){
                return this.showError = true;
            }
            this.name = "Вася";
        return await response.symptoms;
    };
}
export default new HubController();
