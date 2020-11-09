import React from "react";
import controller from "../modules/consultations/controllers/appoint-controller";
import { observer } from "mobx-react";
import { PdfIcon, FileIcon, ImageIcon } from "../modules/consultations/icons";
import { CloseIcon } from "../modules/doctors/icons";
import formatServices from "../services/format-services";

type Props = {
    file: File,
    onClose: () => any,
}


const Icon: React.FC<{ type: string }> = ({ type }) => {

    if (type === "image/jpeg" || type === "image/png") {
        return <ImageIcon />;
    } else if (type === "application/pdf") {
        return <PdfIcon />;
    } else {
        return <FileIcon />
    }

}

const Document: React.FC<Props> = ({ file  }) => {

    // const file: File = controller.documents[index];
    const splitted = file.type.split("/");
    const type = splitted[splitted.length - 1].toUpperCase();

    return <div className="document-button">
        <Icon type={file.type} />
        <div className="info">
            <span className="title">{file.name.substring(0, 15) + (file.name.length > 15 ? "..." : "")}</span>
            <span className="subtitle">{formatServices.formatSize(file.size)} {type}</span>
        </div>
        {/*<div className="icon" onClick={}>*/}
        {/*    <CloseIcon />*/}
        {/*</div>*/}
    </div>
}

export default observer(Document);