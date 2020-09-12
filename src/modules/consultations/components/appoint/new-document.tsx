import React from "react";
import { observer } from "mobx-react";
import { AddIcon } from "../../icons";
import controller from "../../controller/appoint-controller";


const NewDocument: React.FC = () => {
    return <div className="new-document-button">
        <button className="pick-document">
            <AddIcon />
        </button>
        <input type="file" name="name" accept=".png,.jpg,.jpeg,.pdf,.doc,.docx" onChange={(e) => controller.setDocuments(e.target.files)} />
    </div>
}

export default observer(NewDocument);