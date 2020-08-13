import React from "react";
import { observer } from "mobx-react";
import Doctor from "./doctor";
import controller from "../controllers/find-doctor-controller";
import LoadingIndicator from "../../../components/loading-indicator";

const DoctorsWrapper: React.FC = () => {

    return <div className="doctors-container">
        <div className="loading-badge">
            <LoadingIndicator />
        </div>
        <div className="doctors-grid">
            {
                controller.doctors.map((e) => <Doctor name={e.name ?? ""} surname={e.surname ?? ""} imgUrl={e.photoUrl ?? ""} rating={e.rating} age={e.age + " лет"} speciality={e.speciality[0]} />)
            }
        </div>
    </div>
}

export default observer(DoctorsWrapper);