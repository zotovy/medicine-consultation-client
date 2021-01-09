import React from "react";
import "../styles.scss";
import { PdfIcon, FileIcon, ImageIcon } from "../../../../../modules/consultations/icons";
import { observer } from "mobx-react";

type Props = {
    path: string;
    type: string;
    size: string;
    name: string;
};
const Icon: React.FC<{ type: string }> = ({ type }) => {

    if (type === "image/jpeg" || type === "image/png") {
        return <ImageIcon />;
    } else if (type === "application/pdf") {
        return <PdfIcon />;
    } else {
        return <FileIcon />
    }

}
const Doc: React.FC<Props> = (props: Props) => {
    const splitted = props.type.split("/");
    const type = splitted[splitted.length - 1].toUpperCase();

    return(
        <>
            <div className="doc-wrapper">
                <div className="doc-type-icon">
                    <Icon type={props.type} />
                </div>
                <div className="doc-info">
                    <div className="doc-info--name">{props.name.substring(0, 11) + (props.name.length > 11 ? "..." : "")}</div>
                    <p className="doc-info--size--type">{props.size}&nbsp;{type}</p>
                </div>
            </div>
        </>
    )
}

export default observer(Doc);