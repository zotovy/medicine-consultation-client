import { observable, action } from "mobx";
import settingDoctorController from "../../settings/controller";

class SympController {
    @observable items: { title: string, sourseSvg: string, active: boolean, id: number }[] = [
        { title: 'М', sourseSvg: '/', active: true, id: 0 },
        { title: 'Ж', sourseSvg: '/', active: false, id: 1 },
    ];
    @action openTab:any = (items:any,e:any) => {
            // items = this.items;
            e.persist();
            this.items.map((item:object | string | number | any) => {                
                if (item.id == +e._targetInst.key) {
                    item.active = true
                }else{
                    item.active = false;
                }
            })
    };
}
export default new SympController();
