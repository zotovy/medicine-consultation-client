import React from "react";
import { observer } from "mobx-react";
import { Chevron } from "../../icons";
import controller from "../../controllers/find-doctor-controller";



type Props = {
    id?: string;
    title: string;
}

const FilterItemBase: React.FC<Props> = ({ id, title, children }) => {
    return <div id={id} className={`collapsed-item ${controller.openedFilters.includes(title) ? "open" : ""}`}>
        <div className="title" onClick={() => controller.clickOnFilter(title)}>
            <h3>{title}</h3>
            <Chevron
                fill="#727272"
                open={controller.openedFilters.includes(title)}
            />
        </div>
        {
            children
        }
    </div>;
}

export default observer(FilterItemBase);