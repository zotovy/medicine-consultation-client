import { action, observable } from "mobx";
import axios from "axios";
import tokenServices from "../../../services/token-services";
import { authFetch, EAuthFetch } from "../../../services/fetch_services";
import { SupportProblemType } from "../../../../../server/types/models";

class SupportController {
    @observable loading = false;
    @observable chats: SupportChatType[] = [];

    // Create state
    createTitle: string = "";
    createProblem: string = "";
    createDescription: string = "";
    @observable createTitleError?: string;
    @observable createProblemError?: string;
    @observable createDescriptionError?: string;

    goBackCb = () => {}

    public fetchChats = () => {
        this.loading = true;
        action(async () => {
            this.chats = await this._fetchChats().catch((e) => {
                throw e;
            });
            this.loading = false;
            console.log(this.chats);
        })();
    }

    private _fetchChats = async (): Promise<SupportChatType[]> => {
        const isUser = localStorage.getItem("isUser") === "true";
        const route = `/api/${isUser ? "user" : "doctor"}/support-questions`;
        const res = await authFetch(() => axios.get(
            process.env.REACT_APP_SERVER_URL + route,
            {
                headers: { auth: tokenServices.header },
            }
        ));

        if (res.status === EAuthFetch.Error) throw "error";
        if (res.status === EAuthFetch.Unauthorized) throw "logout";
        return (res.data.questions ?? []).map((e: any) => ({
            ...e,
            timestamp: new Date(e.timestamp),
            messages: e.messages.map((el: any) => ({ ...el, date: new Date(el.date) }))
        }));
    }

    public createQuestion = async () => {
        this.loading = true;
        if (!this._validate()) return;
        const isUser = localStorage.getItem("isUser") === "true";
        const res = await authFetch(() => axios.post(
            process.env.REACT_APP_SERVER_URL + "/api/support/create-chat",
            {
                title: this.createTitle,
                message: this.createDescription,
                problem: this.createProblem,
                isUser,
            },
            {
                headers: { auth: tokenServices.header },
            }
        ));
        if (res.status === EAuthFetch.Error) throw "error";
        if (res.status === EAuthFetch.Unauthorized) throw "logout";

        action(() => {
            const { number } = res.data;
            const chat: SupportChatType = {
                messages: [{
                    date: new Date(),
                    isUser: true,
                    content: this.createDescription,
                }],
                id: "",
                problem: this.createProblem as SupportProblemType,
                title: this.createTitle,
                user: localStorage.getItem("uid") as string,
                number,
                timestamp: new Date(),
            };
            this.chats.push(chat);
            this.loading = false;
            this.goBackCb();
        })();
    }

    @action private _validate = (): boolean => {
        this.createTitleError = undefined;
        this.createProblemError = undefined;
        this.createDescriptionError = undefined;
        let ok = true;

        if (!this.createTitle || this.createTitle.length < 8 || this.createTitle.length > 120) {
            this.createTitleError = "Название должно быть от 8 до 120 символов в длину";
            ok = false
        }

        if (!this.createProblem) {
            this.createProblemError = "Это поле обязательно";
            ok = false
        }

        if (!this.createDescription || this.createDescription.length < 1 || this.createDescription.length > 4086) {
            this.createDescriptionError = "Описание должно быть до 4086 символов в длину";
            ok = false
        }
        return ok;
    }
}

export default new SupportController();