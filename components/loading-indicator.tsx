import React from "react";
import { observer } from "mobx-react";

export default observer(() => {
    return <div className="loader">
        <LoadingIndicator/>
    </div>
})

export const LoadingIndicator : React.FC = () => {
    return <div className="sk-chase">
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
    </div>;
}

export const InlineLoadingIndicator: React.FC = () => {
    return <div id="circleG">
        <div id="circleG_1" className="circleG"></div>
        <div id="circleG_2" className="circleG"></div>
        <div id="circleG_3" className="circleG"></div>
    </div>
};