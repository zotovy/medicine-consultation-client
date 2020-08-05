import React from "react";
import { observer } from "mobx-react";
import store from "../store";
import { BecomeDoctorFields } from "./list-item";
import { requests } from "../../../translation";
import { BookmarkIcon } from "../icons";

type Props = {
    i: number
}

const GridElement: React.FC<Props> = ({ i }: Props) => {

    const onRemove = () => {
        store.isCloseModalWindowOpen = true;
        store.userDataOnModalWindow = {
            id: store.requests[i].id,
            name: store.requests[i].name
        }
    }

    const onSubmit = () => {
        store.isSubmitModalWindowOpen = true;
        store.userDataOnModalWindow = {
            id: store.requests[i].id,
            name: store.requests[i].name
        }
    }

    return <div className="card">
        <div className="uprow">
            <div className="left">
                <div className="index">{i + 1}</div>
                <div className="short">{store.requests[i].name}&nbsp;{store.requests[i].surname}</div>
            </div>
            <button id="bookmark" onClick={() => store.triggerBookRequest(i)}>
                <BookmarkIcon booked={store.isRequestBookes[i]} />
            </button>
        </div>
        <div className="info">
            {
                Object.keys(BecomeDoctorFields).map((key: any) => <div className="row" key={key}>
                    <div className="field">
                        {/* 
                        // @ts-ignore */}
                        {requests[key]}

                    </div>
                    <div className="value">
                        {/* 
                        // @ts-ignore */}
                        {store.requests[i][key]}
                    </div>
                </div>)
            }
        </div>
        <div className="buttons">
            <button id="remove" onClick={onRemove}>{requests.remove}</button>
            <button id="submit" onClick={onSubmit}>{requests.submit}</button>
        </div>
    </div>
}

export default observer(GridElement);