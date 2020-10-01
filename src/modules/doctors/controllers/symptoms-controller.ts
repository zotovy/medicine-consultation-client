import { observable, action } from "mobx";
import settingDoctorController from "../../settings/controller";


type Item = { title: string; sourseSvg: any[]; active: boolean; id: number };
type Symp = { title: string; active: boolean; id: number;}
class SympController {
    @observable items: Item[] = [
        { title: "М", sourseSvg: [1,2], active: true, id: 0 },
        { title: "Ж", sourseSvg: [3,4], active: false, id: 1 },
    ];
    @observable symptoms: Symp[] = [
        {title: "Пример 13", active: true, id:0},
        {title: "Пример 24", active: false, id:1},
    ];
    @action choiseSymp = (e: any): void =>{
        e.persist();
        this.symptoms = this.symptoms.map((item: Symp) => {
            console.log(item);
            if (item.id == +e._targetInst.key && item.active != true) {
                console.log(1);
                item.active = true;
            } else {
                console.log(2)
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

}



export default new SympController();
