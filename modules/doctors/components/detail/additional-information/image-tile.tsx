import React from "react";
import DetailController from "../../../controllers/detail-controller";
import { TYPES, useInjection } from "../../../../../container";

type Props = {
    title: string;
    imageUrl: string;
};

const ImageTile : React.FC<Props> = ({ title, imageUrl  }) => {
    const controller = useInjection<DetailController>(TYPES.detailDoctorController);

    return <div className="image-tile active" onClick={() => {
        controller.selectedQualificationImage = imageUrl;
        controller.isAnySelectedQualificationImage = true;
    } }>
        <div className="image-tile_image" style={{ backgroundImage: `url(${imageUrl})` }}/>
        <span className="title">{ title }</span>
    </div>
}

export default ImageTile;