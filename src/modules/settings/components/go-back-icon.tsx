import React from "react";
import { Link } from "react-router-dom";
import { BackIcon } from "../icons";
import MediaQuery from "react-responsive";

const GoBackIcon : React.FC = () => {
    return <MediaQuery maxWidth={425}>
        <div className="back-icon">
            <Link to="/settings">
                <BackIcon/>
            </Link>
        </div>
    </MediaQuery>;
}

export default GoBackIcon;