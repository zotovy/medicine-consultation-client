import React from "react";
import { observer } from "mobx-react";
import controller from "../../controllers/detail-controller";

const FullSizeImageComponent : React.FC = () => {
    const className = `full-size-image-component ${controller.isAnySelectedQualificationImage ? "" : "disable"}`;

    return <div className={className} onClick={() => controller.isAnySelectedQualificationImage = false}>
        <img src={controller.selectedQualificationImage ?? ""} alt="изображение"/>
    </div>
}

export default observer(FullSizeImageComponent);

