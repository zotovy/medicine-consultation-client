import React from "react";

export type YearsTitleComponentProps = {
    years: string;
    title: string;
    subtitle: string;
}

const TileComponent: React.FC<YearsTitleComponentProps> = ({ years, title, subtitle }) => {
    return <div className="tile">
        <span className="years">{ years }</span>
        <span className="tile-title">{ title }</span>
        <p className="subtitle">{ subtitle }</p>
    </div>
}

export default TileComponent;