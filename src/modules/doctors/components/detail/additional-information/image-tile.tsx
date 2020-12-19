import React from "react";
import controller from "../../../controllers/detail-controller";

type Props = {
    title: string;
    imageUrl: string;
};

const ImageTile : React.FC<Props> = ({ title, imageUrl  }) => {
    return <div className="image-tile active" onClick={() => {
        controller.selectedQualificationImage = imageUrl;
        controller.isAnySelectedQualificationImage = true;
    } }>
        <div className="image-tile_image" style={{ backgroundImage: `url(${imageUrl})` }}/>
        <span className="title">{ title }</span>
    </div>
}

export default ImageTile;