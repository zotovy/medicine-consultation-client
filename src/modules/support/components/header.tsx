import React from "react";
import { Link } from "react-router-dom";
import { AddIcon } from "../../../static/icons";

/**
 * Do not include any styles. Used only inside support pages
 */

type Props = {
    title: string;
    link: string;
    back?: string;
}

const SupportHeader: React.FC<Props> = ({ title, back, link }) => {
    return <header>
        <h1>{ title }</h1>
        <Link to={link}>
            <button id="cancel">{ back ?? <AddIcon/> }</button>
        </Link>
    </header>
}

export default SupportHeader;