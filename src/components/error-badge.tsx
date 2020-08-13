import React from "react";
import { WarningIcon } from "../modules/doctors/icons";

type Props = {
    isOpen: boolean;
    message: string;
};

const ErrorBadge: React.FC<Props> = ({ isOpen, message }) => {
    return <div className="error-badge-container">
        <div className={`error-badge ${isOpen ? "" : "close"}`}>
            <div className="icon">
                <WarningIcon />
            </div>
            <span className="message">{message}</span>
        </div>
    </div>
}

export default ErrorBadge;