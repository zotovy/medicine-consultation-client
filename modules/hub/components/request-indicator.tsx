import React from "react";
import { observer } from "mobx-react";
import HubController from "../controllers/hub-controller"
import { TYPES, useInjection } from "container";

type Props = {
    numberRequest: number;
};

const RequestIndicator: React.FC<Props> = (props: Props) => {
    const controller = useInjection<HubController>(TYPES.hubController);

    return <div className="request-indicator-container" onClick={() => {if(+props.numberRequest == 0 ){controller.openRequestsPage()}}}>
        <div className="request-indicator">
            {+props.numberRequest !== 0
                ?
                    <>
                        <div>{props.numberRequest}</div>
                        <span>Новая заявка</span>
                    </>
                :
                    <span>Заявок нет</span>
            }
        </div>
    </div>
}

export default observer(RequestIndicator);
