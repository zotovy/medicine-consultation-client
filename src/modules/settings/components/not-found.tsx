import React from "react";
import { NotFoundIcon } from "../icons";

type Props = {
    text: string;
}

const NotFound : React.FC<Props> = ({ text }) => {
    return <div className="not-found">
        <NotFoundIcon/>
        <span>{ text }</span>
    </div>
}

export default NotFound;