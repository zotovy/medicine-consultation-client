import React from "react";
import { observer } from "mobx-react";
import { AddIcon } from "../../icons";
import AppointmentController from "../../controllers/appoint-controller";
import { useInjection, TYPES } from "container";


const NewDocument: React.FC = () => {
    const controller = useInjection<AppointmentController>(TYPES.appointController);
    return <div className="new-document-button">
        <button className="pick-document">
            <AddIcon/>
        </button>
        <input
            type="file"
            name="name"
            accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
            onChange={(e) => controller.setDocuments(e.target.files)}/>
    </div>
}

export default observer(NewDocument);