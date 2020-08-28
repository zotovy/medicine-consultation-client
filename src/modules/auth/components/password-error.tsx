import React from "react";
import { observer } from "mobx-react";

type Props = {
    error?: string;
};

const PasswordError: React.FC<Props> = ({ error }: Props) => {
    return <div className={`password-error ${error ? "" : "close"}`}>
        <div className="icon">!</div>
        <span>{error}</span>
    </div>
}

export default observer(PasswordError);