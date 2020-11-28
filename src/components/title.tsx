import React from "react";
import "./styles/styles.scss";

type Props = {
    title: string;
    mark: string;
};
const Title: React.FC<Props> = (props: Props) => {
    return(
        <div className="title-wrap">
            <h1>{props.title}<span>{props.mark}</span></h1>   
        </div>
    )
}

export default Title;