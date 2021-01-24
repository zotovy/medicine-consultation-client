import React from "react";
import { observer } from "mobx-react";
import { CloseIcon } from "@/static/icons";
import ConsultationController from "../controllers/consultations_controller";
import withController from "@/utils/inject";

type ControllerProps = { consultationController: ConsultationController };

const NoteComponent : React.FC<ControllerProps > = (props) => {
    const controller = props.consultationController;

    return <div className={`settings-note-wrapper ${controller.isActive ? "" : "disable"}`} onClick={(e) => {
        controller.isActive = false;
    }}>
        <div className="note" onClick={(e) => e.stopPropagation()}>
            <div className="header">
                <span>Записка от врача.</span>
                <p onClick={() => controller.isActive = false}><CloseIcon/></p>
            </div>

            <div className="note-content">
                { controller.selectedCons?.note ?? "" }
            </div>
        </div>
    </div>
}

export default withController(observer(NoteComponent), "consultationController");