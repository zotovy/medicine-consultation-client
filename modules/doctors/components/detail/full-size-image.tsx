import React from "react";
import { observer } from "mobx-react";
import DetailController from "../../controllers/detail-controller";
import { TYPES, useInjection } from "../../../../container";

const FullSizeImageComponent : React.FC = () => {
    const controller = useInjection<DetailController>(TYPES.detailDoctorController);
    const className = `full-size-image-component ${controller.isAnySelectedQualificationImage ? "" : "disable"}`;

    return <div className={className} onClick={() => controller.isAnySelectedQualificationImage = false}>
        <img src={controller.selectedQualificationImage ?? ""} alt="изображение"/>
    </div>
}

export default observer(FullSizeImageComponent);

