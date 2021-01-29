import React from "react";
import ConsultationController , { IConsultationController } from "@/modules/consultations/controllers/consultation-controller";
import { observer } from "mobx-react";
import { TYPES, useInjection } from "container";

type Props = {
    id: string;
    ckey: keyof IConsultationController;
    onClick?: () => void;
}

const ConsultationMainButton: React.FC<Props> = ({ id, children, ckey, onClick }) => {
    const controller = useInjection<ConsultationController>(TYPES.consultationController);
    return <div
        className={`button ${controller[ckey] ? "active" : ""}`}
        id={id}
        onClick={onClick ? onClick : () => controller[ckey] = !controller[ckey]}
    >
        {children}
    </div >
}

export default observer(ConsultationMainButton);

