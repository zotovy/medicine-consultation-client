import React from "react";
import "../styles.scss";

type Props = {
    numberRequest: number;
};
const Error: React.FC<Props> = (props: Props) => {
    return(
        <>
            <div className="request-indicator-container">
                
            </div>
        </>
    )
}

export default Error;