import React from "react";
import "./styles/styles.scss";

export default () => {
    return <div className="loader">
        <div className="sk-chase">
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
        </div>
    </div>
}

export const InlineLoadingIndicator: React.FC = () => {
    return <div id="circleG">
        <div id="circleG_1" className="circleG"></div>
        <div id="circleG_2" className="circleG"></div>
        <div id="circleG_3" className="circleG"></div>
    </div>
};