import React from "react";

type Props = {
    years: string;
    title: string;
    subtitle: string;
}

const TileComponent: React.FC<Props> = ({ years, title, subtitle }) => {
    return <div className="tile">
        <span className="years">{ years }</span>
        <span className="tile-title">{ title }</span>
        <p className="subtitle">{ subtitle }</p>
    </div>
}

export default TileComponent;