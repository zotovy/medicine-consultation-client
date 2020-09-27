import { observable, action } from "mobx";
import settingDoctorController from "../../settings/controller";


type Item = { title: string; sourseSvg: any[]; active: boolean; id: number };

class SympController {
    @observable items: Item[] = [
        { title: "М", sourseSvg: [1,2], active: true, id: 0 },
        { title: "Ж", sourseSvg: [3,4], active: false, id: 1 },
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
