import { action, observable } from "mobx";

class LinkController {

    @observable loading: boolean = true;

    @observable vk? : string;
    @observable instagram? : string;
    @observable telegram? : string;
    @observable whatsApp? : string;
    @observable viber? : string;
    @observable email? : string;
    

    @action onSave = async () : Promise<void> => {

    }

    // Used to go back
    errorCb = () => {}
}

export default new LinkController();