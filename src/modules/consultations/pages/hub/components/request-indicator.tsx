import React from "react";
import "../styles.scss";
import { observer } from "mobx-react";
type Props = {
    numberRequest: number;
};
const Error: React.FC<Props> = (props: Props) => {
    return(
        <>
            <div className="request-indicator-container">
                <div className="request-indicator">
                    <div>{props.numberRequest}</div>
                    <span>{props.numberRequest !== 0 ? "Новая заявка" : "Заявок нет"}</span>
                </div>
            </div>
        </>
    )
}

export default observer(Error);