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
        </>
    )
}

export default observer(Error);