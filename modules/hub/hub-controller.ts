import { injectable } from "inversify";
import { makeObservable } from "mobx";

@injectable()
export default class HubController {

    constructor() {
        makeObservable(this);
    }

}
