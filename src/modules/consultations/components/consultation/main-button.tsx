import React from "react";
import controller, { IConsultationController } from "../../controllers/consultation-controller";
import { observer } from "mobx-react";

type Props = {
    id: string;
    ckey: keyof IConsultationController;
    onClick?: () => void;
}

const ConsultationMainButton: React.FC<Props> = ({ id, children, ckey, onClick }) => {
    return <div
        className={`button ${controller[ckey] ? "active" : ""}`}
        id={id}
        onClick={onClick ? onClick : () => controller[ckey] = !controller[ckey]}
    >
        {children}
    </div >
}

export default observer(ConsultationMainButton);

