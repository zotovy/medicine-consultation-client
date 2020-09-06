import React from "react";
// import { observer } from "mobx-react";
// import Doctor from "./doctor";
// import controller from "../controllers/find-doctor-controller";
// import { InlineLoadingIndicator } from "../../../components/loading-indicator";
// <div className="doctors-grid">
//    {
//        controller.doctors.map((e) => <Doctor name={e.name ?? ""} surname={e.surname ?? ""} imgUrl={e.photoUrl ?? ""} rating={e.rating} age={e.age} speciality={e.speciality[0]} />)
//    }
// </div>
// <div className={`infinity-scroll-loading-indicator ${controller.isInfinyLoading ? "" : "close"}`}>
//     <InlineLoadingIndicator />
// </div>
const SymptomsTitle: React.FC = () => {
    return(
        <div className="symptoms-title-wrap">
            <h1>Симптомы<i>.</i></h1>
            <h3>Выберите симптомы, которые Вас беспокоят.<br/>Мы поможем легко Вам подобрать нужного врача!</h3>    
        </div>
    )
}

export default SymptomsTitle;