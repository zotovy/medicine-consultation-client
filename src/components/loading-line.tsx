import React from "react";
import "./styles/loading-line.scss";

const LoadingLine : React.FC = () => {
    return <div className="loading">
        <div className="loading_line_wrapper">
            <div className="loading_line">
                <div className="loading_line_inner loading_line_inner--1"/>
                <div className="loading_line_inner loading_line_inner--2"/>
            </div>
        </div>
    </div>
}

export default LoadingLine;