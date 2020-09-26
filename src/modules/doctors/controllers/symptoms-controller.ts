import { observable, action } from "mobx";
import settingDoctorController from "../../settings/controller";
import {MaleSide, MaleFront, FemaleSide, FemaleFront} from "../svg-symp";


type Item = { title: string; sourseSvg: any[]; active: boolean; id: number };

class SympController {
    @observable items: Item[] = [
        { title: "М", sourseSvg: ['',''/*{<MaleFront/>}, {<MaleSide/>}*/], active: true, id: 0 },
        { title: "Ж", sourseSvg: ['',''/*{<FemaleFront/>},{<FemaleSide/>}*/], active: false, id: 1 },
    ];
    @action openTab = (items: any, e: any): void => {
        // items = this.items;
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
