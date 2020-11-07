import { observable, action } from "mobx";
import axios from "axios";

type Item = { title: string; sourseSvg: any[]; active: boolean; id: number };
type Symp = { name: string; active: boolean; id: number };

class SympController {
    @observable items: Item[] = [
        { title: "М", sourseSvg: [1, 2], active: true, id: 0 },
        { title: "Ж", sourseSvg: [3, 4], active: false, id: 1 },
    ];
    @observable bodyPart: string = 'Голова';
    @observable doctors: DoctorType[] = [];
    @observable symptoms: Symp[] = [];
    @observable loading: boolean = true;
    @observable arrSymps: any | undefined;
    @observable isErrorBadgeOpen: boolean = false;
    @observable isErrorBadgeOpenCh: boolean = false;
    @observable canFindDoctors: boolean = false;

    @action handlerClick = () => {
        if(this.symptoms.find((n:any)  => n.active) !== undefined){
            this._fetchDoctors(this.bodyPart).then(response => {this.doctors = response});
        }else if(this.symptoms.length == 0){
            this.openBadgeCh()
        }
    }

    @action handlerSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.persist();
        let searchQuery = e.target.value.toLowerCase();
        const displayedContacts = this.arrSymps.filter((el: Symp) => {
            const searchValue = el.name.toLowerCase();
            return searchValue.indexOf(searchQuery) !== -1 || el.active === true;
        });
        this.symptoms = displayedContacts;
    };

    @action choiseSymp = (
        e: React.MouseEvent<HTMLInputElement, MouseEvent>,
        id: number
    ): void => {
        e.persist();
        this.symptoms = this.symptoms.map((item: Symp) => {
            if (item.id === id && item.active !== true) {
                item.active = true;
            } else if (item.id === +id && item.active === true) {
                item.active = false;
            }
            return item;
        });
    };

    @action openTab = (
        id: number
    ): void => {
        this.items = this.items.map((item: Item) => {
            if (item.id === id) {
                item.active = true;
            } else {
                item.active = false;
            }
            return item;
        });
    };

    @action public clickHandlerSymp = async (bodyPart: string = "Голова") => {
        this.loading = true;
        return await this._fetchSymptoms(bodyPart).then(
            action((arrSymps = []) => {
                this.arrSymps = arrSymps.map((item, i): any => {
                    item.active = false;
                    item.id = i;
                    return item;
                });
                this.updateSymps();
                return this.arrSymps;
            })
        );
    };

    private _fetchSymptoms = async (
        bodyPart: string = "Голова"
    ): Promise<Symp[] | undefined> => {
        
        const response = await axios
            .get(
                process.env.REACT_APP_SERVER_URL +
                `api/symptoms?bodyPart=${bodyPart}`
            )
            .then((data: any) => data.data)
            .catch((e: any) => {
                return { success: false };
            });

        if (!response.success) {
            // todo: error handling
            this._openBadge();
            return [];
        } else {
            this.loading = false;
        }
        this.bodyPart = bodyPart;
        return await response.symptoms;
    };

    @action updateSymps = (): void => {
        // todo: update symp array after fetch request
        this.symptoms = [];
        this.symptoms = this.arrSymps.map((item: Symp, i: number) => {
            return (item = this.arrSymps[i]);
        });
    };

    @action highlightBodyPart = (e: any): void => {
        // todo: highlight body part
        e.persist();
        const el = e.target.closest("g.bodyPart"),
            list = document.querySelectorAll(".bodyPart");
        list.forEach((item) => {
            item.classList.remove("active");
            if (e.target.id === item.id || el.id === item.id) {
                item.classList.add("active");
            }
        });
    };

    private _openBadge = () => {
        this.isErrorBadgeOpen = true;
        setTimeout(() => {
            this.isErrorBadgeOpen = false;
        }, 5000);
    };

    private openBadgeCh = () => {
        this.isErrorBadgeOpenCh = true;
        setTimeout(() => {
            this.isErrorBadgeOpenCh = false;
        }, 5000);
    };

    private _fetchDoctors = async (
        bodyPart: string
    ): Promise<DoctorType[]> => {
        const response = await axios
            .get(
                process.env.REACT_APP_SERVER_URL + `api/doctors?symptoms=${bodyPart}`
            )
            .then((data: any) => {this.canFindDoctors = true; return data.data})
            .catch((e: any) => {
                return { success: false };
            });

        if (!response.success) {
            // todo: error handling
            this._openBadge();
            return [];
        } else {
            this.loading = false;
        }
        return await response.doctors;
    };
}

export default new SympController();
