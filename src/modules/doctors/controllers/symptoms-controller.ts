import { observable, action } from "mobx";
import settingDoctorController from "../../settings/controller";
import axios from "axios";

type Item = { title: string; sourseSvg: any[]; active: boolean; id: number };
type Symp = { title: string; active: boolean; id: number;}
class SympController {
    @observable items: Item[] = [
        { title: "М", sourseSvg: [1,2], active: true, id: 0 },
        { title: "Ж", sourseSvg: [3,4], active: false, id: 1 },
    ];
    @observable symptoms: Symp[] = [
        {title: "Пример 13", active: false, id:0},
        {title: "Пример 24", active: false, id:1},
        {title: "Пример 35", active: false, id:2},
    ];
    @observable loading: boolean = true;
    @observable arrSymps: Symp[] | undefined;

    @action choiseSymp = (e: any): void =>{
        e.persist();
        this.symptoms = this.symptoms.map((item: Symp) => {
            if (item.id == +e._targetInst.key && item.active !== true) {
                item.active = true;
            } else if(item.id == +e._targetInst.key && item.active == true){
                item.active = false;
            }
            return item;
        });
    }
    @action openTab = (items: any, e: any): void => {
        e.persist();
        this.items = this.items.map((item: Item) => {
            if (item.id == +e._targetInst.key) {
                item.active = true;
            } else {
                item.active = false;
            }
            return item;
        });
    };
    @action public clickHandlerSymp = (info: number):void => {
        this.loading = true;
        console.log(info)
        this._fetchDoctor(info).then(
            action((arrSymps) => {
                this.arrSymps = arrSymps;
                this.loading = false;
            })
        );;
    }
    private _fetchDoctor = async (
        info: number
    ): Promise<Symp[] | undefined> => {
        const response = await axios
            .get(process.env.REACT_APP_SERVER_URL + "/api/doctor/" + info)
            .then((data:any) => data.data)
            .catch((e:any) => e.response);

        if (!response?.success) {
            // todo: error handling
            return;
        }
        return await response.arrSymps;
    };
}



export default new SympController();
