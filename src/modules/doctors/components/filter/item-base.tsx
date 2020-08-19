import React from "react";
import { observer } from "mobx-react";
import { Chevron } from "../../icons";
import controller from "../../controllers/find-doctor-controller";



type Props = {
    id?: string;
    title: string;
}

const FilterItemBase: React.FC<Props> = ({ id, title, children }) => {


    return <div className={`item ${controller.activeFilters.includes(title) ? "active" : ""}`}>
        <div id={id} className="title" onClick={() => controller.clickOnFilter(title)}>
            <h5>{title}</h5>
            <Chevron
                fill="#727272"
                open={controller.openedFilter === title}
            />
        </div>
        <div className={`collapsed ${controller.openedFilter === title ? "active" : ""}`}>
            {
                children
            }
        </div>
    </div>;
}

export default observer(FilterItemBase);