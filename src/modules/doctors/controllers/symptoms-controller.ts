import { observable, action , toJS} from "mobx";
import settingDoctorController from "../../settings/controller";
import axios from "axios";

type Item = { title: string; sourseSvg: any[]; active: boolean; id: number };
type Symp = { name: string; active: boolean; id: number;}
class SympController {
    @observable items: Item[] = [
        { title: "М", sourseSvg: [1,2], active: true, id: 0 },
        { title: "Ж", sourseSvg: [3,4], active: false, id: 1 },
    ];
    @observable symptoms: Symp[] = [
    ];
    @observable loading: boolean = true;
    @observable arrSymps: any | undefined;

    @action handlerChange = (e: any): void =>{
        e.persist();
        console.log(e);
    } 
    @action choiseSymp = (e: any): void =>{
        e.persist();
        this.symptoms = this.symptoms.map((item: Symp,i:number) => {
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
    
    @action public clickHandlerSymp = (bodyPart: string = "Голова") => {
        this.loading = true;
        this._fetchSymptoms(bodyPart).then(
            action((arrSymps=[]) => {
                this.arrSymps = arrSymps.map((item, i):any => {
                    item.active = false;
                    item.id = i;
                    return item;
                })
                this.loading = false;
                this.updateSymps();
                return(this.arrSymps , this.loading);
            })
        );       
        return(this.arrSymps)
    }
    private _fetchSymptoms = async (bodyPart:string="Голова"
    ): Promise<Symp[] | undefined> => {
        const response = await axios
            .get("https://mc-test.ga" + `/api/symptoms?bodyPart=${bodyPart}`)
            .then((data:any) => data.data)
            .catch((e:any) => e.response)

        if (!response?.success) {
            // todo: error handling
            return;
        }
        return await response.symptoms;
    };
    @action highlightBodyPart = (e: any): void => {
        // todo: highlight body part
        e.persist()
        console.log(e)
        let list = document.querySelectorAll('.bodyPart');
        list.forEach(item =>{
            item.classList.remove('active')
            if(e.target.id == item.id){
                item.classList.add('active')
            }
            return item
        })
    }
    updateSymps = ():void => {
        // todo: update symp array after fetch request
        this.symptoms = [];
        this.symptoms = this.arrSymps.map((item: Symp,i:number) => {
            return item = this.arrSymps[i] 
        });
    }

}



export default new SympController();
