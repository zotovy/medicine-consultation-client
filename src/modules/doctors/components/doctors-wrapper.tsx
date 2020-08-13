import React from "react";
import { observer } from "mobx-react";
import Doctor from "./doctor";
import controller from "../controllers/find-doctor-controller";

const DoctorsWrapper: React.FC = () => {

    return <div className="doctors-container">
        {
            controller.doctors.map((e) => <Doctor name={e.name ?? ""} surname={e.surname ?? ""} imgUrl={e.photoUrl ?? ""} rating={e.rating} age={e.age + " лет"} speciality={e.speciality[0]} />)
        }
    </div>
}

export default observer(DoctorsWrapper);