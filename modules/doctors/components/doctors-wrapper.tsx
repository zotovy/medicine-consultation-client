import React from "react";
import { observer } from "mobx-react";
import Doctor from "./doctor";
import FindDoctorController from "../controllers/find-doctor-controller";
import { InlineLoadingIndicator } from "@/components/loading-indicator";
import { useInjection, TYPES } from "../../../container";

const DoctorsWrapper: React.FC = () => {
    const controller = useInjection<FindDoctorController>(TYPES.findDoctorController);

    return <div className="doctors-container">
        <div className="doctors-grid">
            {
                controller.isLoading
                    ? [...Array(9)].map(() => <Doctor id="" name="" surname="" imgUrl="" rating={0} age={0} speciality="" />)
                    : controller.doctors.map((e) => <Doctor id={e.id ?? ""} name={e.name ?? ""} surname={e.surname ?? ""} imgUrl={e.photoUrl ?? ""} rating={e.rating} age={e.age} speciality={e.speciality[0]} />)
            }
        </div>
        <div className={`infinity-scroll-loading-indicator ${controller.isInfinyLoading ? "" : "close"}`}>
            <InlineLoadingIndicator />
        </div>
    </div>
}

export default observer(DoctorsWrapper);