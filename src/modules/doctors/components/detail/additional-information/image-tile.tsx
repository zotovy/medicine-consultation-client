import React from "react";

type Props = {
    title: string;
    imageUrl: string;
};

const ImageTile : React.FC<Props> = ({ title, imageUrl  }) => {
    return <div className="image-tile">
        <div className="image-tile_image" style={{ backgroundImage: `url(${imageUrl})` }}/>
        <span className="title">{ title }</span>
    </div>
}

export default ImageTile;