import React from "react";
import "./styles/styles.scss";

type Props = {
    title: string;
}

const Title: React.FC<Props> = (props: Props) => {
    return <React.Fragment>
        <div className="title">
            <div className="stick"></div>
            <h1> {props.title} </h1>
        </div>
    </React.Fragment>
};

export default Title;